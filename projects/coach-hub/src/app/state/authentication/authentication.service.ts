import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationStore } from './authentication.store';
import { filter, finalize, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { LoginInterface } from './models/login.interface';
import { TokenInterface } from './models/token.interface';
import { environment } from '../../../environments/environment';
import { resetStores } from '@datorama/akita';
import { SignUpInterface } from './models/sign-up.interface';
import { ResetPasswordInterface } from '../../modules/authentication/forgot-password/models/reset-password.interface';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationQuery } from './authentication.query';
import { RootRoutesEnum } from '../../root-routes.enum';
import { CustomHeadersEnum } from './models/custom-headers.enum';
import { JwtClass } from './models/jwt/jwt.class';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  // TODO: Add these to the store so that they can be reset on logout
  private _lastTimeTokenExpired = null;
  private _shouldCheckIfTokenIsExpired = true;

  constructor(
    private store: AuthenticationStore,
    private query: AuthenticationQuery,
    private http: HttpClient,
    private router: Router,
  ) {
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

  logout(): Observable<any> {
    const path = '/logout';

    return from(this.router.navigate([ RootRoutesEnum.Login])).pipe(
      take(1),
      mergeMap(() => this.http.post<string>(environment.api_url + path, null, { withCredentials: true }).pipe(
        finalize(() => resetStores())
      ))
    );
  }

  login(user: LoginInterface) {
    const path = '/login';

    return this.http
      .post<TokenInterface>(environment.api_url + path, JSON.stringify(user), { withCredentials: true })
      .pipe(
        tap(token => {
          this.setAccessToken(token, user.rememberMe);
        })
      );
  }

  signUp(user: SignUpInterface) {
    const path = '/register';

    return this.http
      .post<void>(environment.api_url + path, JSON.stringify(user));
  }

  verify(email: string, verificationToken: string) {
    const path = '/verify';

    return this.http
      .post<TokenInterface>(environment.api_url + path, JSON.stringify({ email, token: verificationToken }))
      .pipe(
        tap(token => {
          this.setAccessToken(token, true);
        })
      );
  }

  resetPassword(credentials: ResetPasswordInterface) {

    const path = '/reset-password';

    return this.http
      .post<TokenInterface>(environment.api_url + path, JSON.stringify({ ...credentials }))
      .pipe(
        tap(token => {
          this.setAccessToken(token, true);
        })
      );
  }

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
