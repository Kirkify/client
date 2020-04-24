import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SignUpStore, SignUpState } from './sign-up.store';

@Injectable({ providedIn: 'root' })
export class SignUpQuery extends Query<SignUpState> {

  constructor(protected store: SignUpStore) {
    super(store);
  }

}
