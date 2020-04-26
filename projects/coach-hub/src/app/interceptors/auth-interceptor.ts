import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, mergeMap, take } from 'rxjs/operators';
import { AuthenticationService } from '../state/authentication/authentication.service';
import { throwError } from 'rxjs';
import { CustomHeadersEnum } from '../state/authentication/models/custom-headers.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Let's add the token to the request
    return this._getToken(req, next);
  }

  private _waitForRefreshToFinish(req: HttpRequest<any>, next: HttpHandler) {
    // Grab the access token when available
    return this.authService.selectAccessTokenWhenNotNull().pipe(
      // Complete immediately
      take(1),
      mergeMap(token => {
        req = req.clone({
          setHeaders: {
            Authorization: token
          }
        });
        // Allow the request to continue
        return this._sendRequest(req, next);
      })
    );
  }

  private _sendRequest(req: HttpRequest<any>, next: HttpHandler) {
    // Allow the request to continue
    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          switch ((err as HttpErrorResponse).status) {
            // 401 Authentication Error
            case 401:
              try {
                const url = new URL((err as HttpErrorResponse).url);
                const paths = url.pathname.split('/');
                if (paths.length > 0) {
                  const pathName = paths[paths.length - 1];
                  if (pathName === 'logout' || pathName === 'refresh') {
                    this.authService.logout(true);
                    return throwError(err);
                  }
                }
              } catch (ex) {
                // TODO: remove console.log
                console.log('This should never hit');
                return throwError(err);
              }
              return this.authService.selectIsAuthenticated().pipe(
                take(1),
                mergeMap(authenticated => {
                  if (authenticated) {
                    // Let's try to refresh the token since the user is authenticated
                    return this._handle401Error(req, next);
                  } else {
                    return throwError(err);
                  }
                })
              );
          }
        }
        return throwError(err);
      })
    );
  }

  private _getToken(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.selectIsTokenRefreshing().pipe(
      take(1),
      mergeMap(isRefreshing => {
        // If we are in a refresh state
        if (isRefreshing) {
          // The refresh token request contains a custom header to distinguish it from others
          if (req.headers.has(CustomHeadersEnum.Refresh)) {
            // Then delete it as it's only for client side
            req = req.clone({ headers: req.headers.delete(CustomHeadersEnum.Refresh) });
            // We want to allow this refresh request through
            return this._sendRequest(req, next);
          } else {
            return this._waitForRefreshToFinish(req, next);
          }
        }

        // Try grabbing the auth token
        return this.authService.selectAccessToken().pipe(
          // We only care for the first emitted value
          take(1),
          mergeMap(token => {
            // If we have a token then add the Authorization header
            if (token !== null) {
              req = req.clone({
                setHeaders: {
                  Authorization: token
                }
              });
            }
            // Allow the request to continue
            return this._sendRequest(req, next);
          })
        );
      })
    );
  }

  private _handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    // If the token is already refreshing this means a previous request has already
    // Triggered the handling of the Authentication error.
    // This can happen if multiple requests are sent at the same time, the subsequent
    // request(s) may have been sent before we received the first initial 401
    return this.authService.selectIsTokenRefreshing().pipe(
      take(1),
      mergeMap(isRefreshing => {
        if (isRefreshing) {
          return this._waitForRefreshToFinish(req, next);
        } else {
          // Let's try refreshing the token
          return this.authService.refreshToken().pipe(
            mergeMap(() => {
              return this._waitForRefreshToFinish(req, next);
            })
          );
        }
      })
    );
  }
}
