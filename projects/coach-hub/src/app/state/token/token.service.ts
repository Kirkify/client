import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStore } from './token.store';
import { TokenQuery } from './token.query';
import { filter, finalize, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TokenInterface } from '../authentication/models/token.interface';
import { CustomHeadersEnum } from '../authentication/models/custom-headers.enum';
import { environment } from '../../../environments/environment';
import { JwtClass } from '../authentication/models/jwt/jwt.class';

@Injectable({ providedIn: 'root' })
export class TokenService {

  private _lastTimeTokenExpired = null;
  private _shouldCheckIfTokenIsExpired = true;

  constructor(private store: TokenStore,
              private query: TokenQuery,
              private http: HttpClient) {
  }

  selectAccessTokenString$ = this.query.selectIsAccessTokenRefreshing$.pipe(
    filter(isRefreshing => isRefreshing === false),
    take(1),
    mergeMap(() => this.query.selectToken$.pipe(
      take(1),
      mergeMap(token => {
        if (token) {
          // We don't want to return an expired access token
          if (this.isAccessTokenExpired(token.access_token)) {
            // So force a refresh
            return this.refreshToken().pipe(
              switchMap(() => this.query.selectAccessTokenString$)
            );
          }
        }
        return this.query.selectAccessTokenString$;
      })
    ))
  );

  setAccessToken(token: TokenInterface, rememberToken = this.query.getValue().rememberToken) {
    this.store.update({ token, rememberToken });
  }

  refreshToken(): Observable<TokenInterface> {

    const path = '/login/refresh';

    // TODO: check if mobile app or web app
    // Web refresh tokens are stored in HTTP only cookie so no need to attach
    const formData = {
      refresh_token: null
    };

    // By adding this custom header the token interceptor will allow it through
    const httpOptions = {
      headers: new HttpHeaders({
        [ CustomHeadersEnum.TokenFree ]: ''
      }),
      withCredentials: true
    };

    this.store.update({ isAccessTokenRefreshing: true });

    // Try refreshing the token
    return this.http
      .post<TokenInterface>(environment.api_url + path, JSON.stringify(formData), httpOptions)
      .pipe(
        finalize(() => this.store.update({ isAccessTokenRefreshing: false })),
        tap(token => {
          this.setAccessToken(token);
        })
      );
  }

  private isAccessTokenExpired(accessToken: string) {
    if (accessToken !== null && this._shouldCheckIfTokenIsExpired) {
      const jwtHelper = new JwtClass();
      const isTokenExpired = jwtHelper.isTokenExpired(accessToken, 1);

      if (isTokenExpired) {
        if (this._lastTimeTokenExpired !== null) {
          const timeDiffInSeconds = Math.floor((Date.now() - this._lastTimeTokenExpired) / 1000);

          // If the clients time is for some reason wrong, we should remove the check for token expired
          if (timeDiffInSeconds <= 60) {
            this._shouldCheckIfTokenIsExpired = false;
            return false;
          } else {
            this._lastTimeTokenExpired = Date.now();
          }
        } else {
          this._lastTimeTokenExpired = Date.now();
        }
        return true;
      }
    }
    return false;
  }
}
