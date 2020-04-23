import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationStore } from './authentication.store';
import { tap } from 'rxjs/operators';
import { LoginInterface } from './models/login.interface';
import { TokenInterface } from './models/token.interface';
import { environment } from '../../../environments/environment';
import { STORAGE_PROVIDER_KEY } from '../../models/storage-provider-key';
import { PersistState } from '@datorama/akita';

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
}
