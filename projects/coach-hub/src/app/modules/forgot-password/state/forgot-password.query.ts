import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ForgotPasswordState, ForgotPasswordStore } from './forgot-password.store';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordQuery extends Query<ForgotPasswordState> {

  constructor(protected store: ForgotPasswordStore) {
    super(store);
  }

}
