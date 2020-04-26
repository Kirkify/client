import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationStore } from './authentication.store';
import { catchError, filter, finalize, map, mergeMap, shareReplay, tap } from 'rxjs/operators';
import { LoginInterface } from './models/login.interface';
import { TokenInterface } from './models/token.interface';
import { environment } from '../../../environments/environment';
import { STORAGE_PROVIDER_KEY } from '../../models/storage-provider-key';
import { filterNil, PersistState, resetStores } from '@datorama/akita';
import { SignUpInterface } from './models/sign-up.interface';
import { ResetPasswordInterface } from '../../modules/forgot-password/models/reset-password.interface';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationQuery } from './authentication.query';
import { JwtClass } from './models/jwt/jwt.class';
import { CustomHeadersEnum } from './models/custom-headers.enum';
import { AccessTokenInterface } from './models/access-token.interface';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private _isTokenRefreshingSubject = new BehaviorSubject<boolean>(false);
  private _lastTimeTokenExpired = null;
  private _shouldCheckIfTokenIsExpired = true;

  constructor(
    private store: AuthenticationStore,
    private query: AuthenticationQuery,
    private http: HttpClient,
    private router: Router,
    @Inject(STORAGE_PROVIDER_KEY) private persistStorage: PersistState
  ) {
  }

  logout(force = false) {
    console.log('Logging you out securely now ...');

    if (!force) {
      this._logout()
        .subscribe(res => {
            this.finishLogout();
          },
          err => {
            this.finishLogout();
          });
    } else {
      this.finishLogout();
    }
  }

  finishLogout() {
    // Check if persist is even needed
    this.persistStorage.clear();
    resetStores();
    this.router.navigate([ '/' ]);
    console.log('You have been successfully logged out');
  }

  login(user: LoginInterface) {
    const path = '/login';

    return this.http
      .post<TokenInterface>(environment.api_url + path, JSON.stringify(user), { withCredentials: true })
      .pipe(
        tap(res => this.store.updateUser(res, user.rememberMe))
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
        tap(res => this.store.updateUser(res, true))
      );
  }

  resetPassword(credentials: ResetPasswordInterface) {

    const path = '/reset-password';

    return this.http
      .post<TokenInterface>(environment.api_url + path, JSON.stringify({ ...credentials }))
      .pipe(
        tap(res => this.store.updateUser(res, true))
      );
  }

  selectIsAuthenticated() {
    return this.query.selectIsAuthenticated$;
  }

  selectIsTokenRefreshing() {
    return this._isTokenRefreshingSubject.asObservable().pipe(
      shareReplay(1)
    );
  }

  selectTokenWhenNotRefreshing() {
    return this.selectIsTokenRefreshing().pipe(
      filter(isRefreshing => !isRefreshing)
    );
  }

  selectAccessToken() {
    return this.selectTokenWhenNotRefreshing().pipe(
      mergeMap(() => this.query.selectAccessToken$.pipe(
        mergeMap(accessToken => {
          // TODO: Might want to look into this
          // There are times when multiple requests can be dispatched and before the selectTokenIsNotRefreshing is updated to
          // A refresh state, we may send a bunch of refresh requests
          if (accessToken !== null) {
            // We don't want to return an expired access token
            if (this.isAccessTokenExpired(accessToken.value)) {
              // So force a refresh
              return this.refreshToken().pipe(
                // Send back the newly refreshed token
                map(token => this._getTokenStringFromToken(token))
              );
            }
          }
          return of(null).pipe(
            map(() => this._getTokenStringFromAccessToken(accessToken))
          );
        })
      ))
    );
  }

  refreshToken(): Observable<TokenInterface> {
    // We are now beginning the refresh so mark the subject as true
    this._isTokenRefreshingSubject.next(true);

    const path = '/login/refresh';

    // TODO: check if mobile app or web app
    // Web refresh tokens are stored in HTTP only cookie so no need to attach
    const formData = {
      refresh_token: null
    };

    // By adding this custom header the token interceptor will allow it through
    const httpOptions = {
      headers: new HttpHeaders({
        [ CustomHeadersEnum.Refresh ]: ''
      }),
      withCredentials: true
    };

    // Try refreshing the token
    return this.http
      .post<TokenInterface>(environment.api_url + path, JSON.stringify(formData), httpOptions)
      .pipe(
        tap(token => {
          // Successful so update with new token
          this.store.updateUser(token)
          // We have now completed the refresh so set back to false
          this._isTokenRefreshingSubject.next(false);
        }),
        catchError(err => {
          // Refresh failed so set back to false
          this._isTokenRefreshingSubject.next(false);
          // And force a logout
          this.logout(true);
          // Throw forward
          return throwError(err);
        }),
        finalize(() => {
          // In case a refresh request was somehow cancelled mid flight
          this._isTokenRefreshingSubject.next(false);
        })
      );
  }

  selectAccessTokenWhenNotNull() {
    return this.selectAccessToken().pipe(
      filterNil
    );
  }

  private isAccessTokenExpired(accessToken: string) {
    if (accessToken !== null && this._shouldCheckIfTokenIsExpired) {
      const jwtHelper = new JwtClass();
      const isTokenExpired = jwtHelper.isTokenExpired(accessToken);

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

  private _logout(): Observable<any> {
    const path = '/logout';

    return this.http
      .post<string>(environment.api_url + path, null, { withCredentials: true });
  }

  private _getTokenStringFromAccessToken(token: AccessTokenInterface): string {
    return token !== null ? `${token.token_type} ${token.value}` : null;
  }

  private _getTokenStringFromToken(token: TokenInterface): string {
    return token !== null ? `${token.token_type} ${token.access_token}` : null;
  }
}
