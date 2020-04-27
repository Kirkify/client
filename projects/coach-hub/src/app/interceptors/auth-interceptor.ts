import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, filter, mergeMap, switchMap, take } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { CustomHeadersEnum } from '../state/authentication/models/custom-headers.enum';
import { TokenService } from '../state/token/token.service';
import { TokenQuery } from '../state/token/token.query';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private query: TokenQuery
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.has(CustomHeadersEnum.TokenFree)) {
      // Then delete it as it's only for client side
      req = req.clone({ headers: req.headers.delete(CustomHeadersEnum.TokenFree) });
      // We want to allow this refresh request through
      return this._sendRequest(req, next, false);
    }
    return this._attachTokenAndSendRequest(req, next);
  }

  /**
   * Allows a request to wait until a new token becomes available
   *
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpSentEvent | HttpHeaderResponse | HttpResponse<any> | HttpProgressEvent | HttpUserEvent<any>>}
   * @private
   *
   */
  private _waitForRefreshToFinish(req: HttpRequest<any>, next: HttpHandler) {
    // Grab the access whenever the refresh is done
    return this.query.selectIsAccessTokenRefreshing$.pipe(
      filter(isRefreshing => isRefreshing === false),
      take(1),
      mergeMap(() => {
        return this._attachTokenAndSendRequest(req, next);
      })
    );
  }

  /**
   * Sends the request but has logic in place to handle 401 errors
   *
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @private
   */
  private _sendRequest(req: HttpRequest<any>, next: HttpHandler, handleError = true): Observable<HttpEvent<any>> {
    if (! handleError) {
      return next.handle(req);
    }
    // Allow the request to continue
    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            // 401 Authentication Error
            case 401:
              // If we received the 401 while we were authenticated
              return this.query.selectIsAuthenticated$.pipe(
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

  private _attachTokenAndSendRequest(req: HttpRequest<any>, next: HttpHandler) {
    // Try grabbing the auth token
    return this.tokenService.selectAccessTokenString$.pipe(
      // We only care for the first emitted value
      take(1),
      mergeMap(token => {
        // If we have a token then add the Authorization header
        if (token) {
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
  }

  private _handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    // If the token is already refreshing this means a previous request has already
    // Triggered the handling of the Authentication error.
    // This can happen if multiple requests are sent at the same time, the subsequent
    // request(s) may have been sent before we received the first initial 401
    return this.query.selectIsAccessTokenRefreshing$.pipe(
      take(1),
      mergeMap(isRefreshing => {
        if (isRefreshing) {
          return this._waitForRefreshToFinish(req, next);
        }
        return this.tokenService.refreshToken().pipe(
          switchMap(() => this._attachTokenAndSendRequest(req, next))
        );
      })
    );
  }
}
