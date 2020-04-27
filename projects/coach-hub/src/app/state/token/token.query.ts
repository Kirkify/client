import { Injectable } from '@angular/core';
import { filterNil, Query } from '@datorama/akita';
import { TokenState, TokenStore } from './token.store';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TokenQuery extends Query<TokenState> {

  constructor(protected store: TokenStore) {
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
}
