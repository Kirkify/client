import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface LoginState {
   key: string;
}

export function createInitialState(): LoginState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'login' })
export class LoginStore extends Store<LoginState> {

  constructor() {
    super(createInitialState());
  }

}

