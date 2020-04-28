import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface ForgotPasswordState {
   key: string;
}

export function createInitialState(): ForgotPasswordState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'forgotPassword' })
export class ForgotPasswordStore extends Store<ForgotPasswordState> {

  constructor() {
    super(createInitialState());
  }

}

