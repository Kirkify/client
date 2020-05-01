import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { TokenInterface } from './models/token.interface';

export interface AuthenticationState {
  token: TokenInterface;
  isAccessTokenRefreshing: boolean;
  rememberToken: boolean;
  isLoggingOut: boolean;
}

export function createInitialState(): AuthenticationState {
  return {
    token: null,
    isAccessTokenRefreshing: false,
    rememberToken: false,
    isLoggingOut: false
  };
}

export const AUTHENTICATION_STORE_NAME = 'authentication';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: AUTHENTICATION_STORE_NAME })
export class AuthenticationStore extends Store<AuthenticationState> {

  constructor() {
    super(createInitialState());
  }
}

