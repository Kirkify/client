import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { LoginStore, LoginState } from './login.store';

@Injectable({ providedIn: 'any' })
export class LoginQuery extends Query<LoginState> {

  constructor(protected store: LoginStore) {
    super(store);
  }

}
