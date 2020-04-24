import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthenticationQuery } from '../state/authentication/authentication.query';
import { mergeMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private query: AuthenticationQuery
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return this.query.selectAccessTokenString$.pipe(
      take(1),
      mergeMap(token => {
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: token
            }
          });
        }
        return next.handle(req);
      })
    );
  }
}
