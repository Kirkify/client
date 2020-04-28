import { Injectable } from '@angular/core';
import { filterNil, Query } from '@datorama/akita';
import { AuthenticationState, AuthenticationStore } from './authentication.store';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationQuery extends Query<AuthenticationState> {

  constructor(
    protected store: AuthenticationStore
  ) {
    super(store);
  }

  selectToken$ = this.select(store => store.token);

  selectAccessTokenString$ = this.selectToken$.pipe(
    map(token => {
      if (token) {
        return `${token.token_type} ${token.access_token}`;
      }
      return '';
    })
  );

  selectIsAccessTokenRefreshing$ = this.select(store => store.isAccessTokenRefreshing);

  selectIsAuthenticated$ = this.selectToken$.pipe(
    map(token => token !== null)
  );

  selectUser$ = this.selectToken$.pipe(
    filterNil,
    map(token => token.user)
  );

  getUser() {
    return this.getValue().token.user;
  }

  getUserId() {
    return this.getUser().id;
  }
}
