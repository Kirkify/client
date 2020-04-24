import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationStore } from './authentication.store';
import { tap } from 'rxjs/operators';
import { LoginInterface } from './models/login.interface';
import { TokenInterface } from './models/token.interface';
import { environment } from '../../../environments/environment';
import { STORAGE_PROVIDER_KEY } from '../../models/storage-provider-key';
import { PersistState } from '@datorama/akita';
import { SignUpInterface } from './models/sign-up.interface';
import { ResetPasswordInterface } from '../../modules/forgot-password/models/reset-password.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(
    private store: AuthenticationStore,
    private http: HttpClient,
    @Inject(STORAGE_PROVIDER_KEY) private persistStorage: PersistState
  ) {
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
}
