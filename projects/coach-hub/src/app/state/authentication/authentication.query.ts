import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AuthenticationStore, AuthenticationState } from './authentication.store';
import { filter, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationQuery extends Query<AuthenticationState> {

  constructor(protected store: AuthenticationStore) {
    super(store);
  }

  selectIsAuthenticated$ = this.select(({ user }) => user !== null);

  selectUser() {
    return this.select(state => state.user);
  }

  selectUserIfNotNull() {
    return this.selectUser().pipe(
      filter(user => user !== null),
      shareReplay(1)
    );
  }
}
