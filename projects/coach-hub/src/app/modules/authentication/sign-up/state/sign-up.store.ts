import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SignUpState {
   key: string;
}

export function createInitialState(): SignUpState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'signUp' })
export class SignUpStore extends Store<SignUpState> {

  constructor() {
    super(createInitialState());
  }

}

