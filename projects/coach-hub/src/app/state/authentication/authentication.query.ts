import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AuthenticationStore, AuthenticationState } from './authentication.store';
import { filter, map, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationQuery extends Query<AuthenticationState> {

  constructor(
    protected store: AuthenticationStore
  ) {
    super(store);
  }

  selectAccessToken$ = this.select(store => store.accessToken);

  selectAccessTokenString$ = this.selectAccessToken$.pipe(
    map(accessToken => {
      if (accessToken) {
        return `${accessToken.token_type} ${accessToken.value}`;
      }
      return '';
    })
  );

  selectAccessTokenStringWhenAvailable$ = this.selectAccessTokenString$.pipe(
    filter(token => token !== '')
  );

  selectIsAuthenticated$ = this.select(({ user }) => user !== null);

  selectIsTokenRefreshing$ = this.select(store => store.isTokenRefreshing);

  selectUser() {
    return this.select(state => state.user);
  }

  selectUserIfNotNull() {
    return this.selectUser().pipe(
      filter(user => user !== null),
      shareReplay(1)
    );
  }

  getUserId() {
    return this.getValue().user.id;
  }
}
