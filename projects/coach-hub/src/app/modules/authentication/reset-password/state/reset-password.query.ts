import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ResetPasswordStore } from './reset-password.store';

@Injectable({ providedIn: 'root' })
export class ResetPasswordQuery extends Query<{}> {

  constructor(protected store: ResetPasswordStore) {
    super(store);
  }
}
