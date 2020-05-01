import { Injectable } from '@angular/core';
import { filterNil, Query } from '@datorama/akita';
import { AuthenticationState, AuthenticationStore } from './authentication.store';
import { map } from 'rxjs/operators';
import { RoleEnum } from './models/role.enum';

@Injectable({ providedIn: 'root' })
export class AuthenticationQuery extends Query<AuthenticationState> {

  constructor(
    protected store: AuthenticationStore
  ) {
    super(store);
  }

  selectIsLoggingOut$ = this.select(store => store.isLoggingOut);

  selectToken$ = this.select(store => store.token);

  selectRoles$ = this.selectToken$.pipe(
    filterNil,
    map(token => token.roles)
  );

  selectHasCoachRole$ = this.selectRoles$.pipe(
    map(roles => {
      return roles.includes(RoleEnum.Coach);
    })
  );

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

  selectUserFirstName$ = this.selectUser$.pipe(
    map(user => user.first_name)
  );

  getUser() {
    return this.getValue().token.user;
  }

  getUserId() {
    return this.getUser().id;
  }
}
