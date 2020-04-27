import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { TokenInterface } from '../authentication/models/token.interface';

export interface TokenState {
  token: TokenInterface;
  isAccessTokenRefreshing: boolean;
  rememberToken: boolean;
}

export function createInitialState(): TokenState {
  return {
    token: null,
    isAccessTokenRefreshing: false,
    rememberToken: false
  };
}

export const TOKEN_STORE = 'token';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: TOKEN_STORE })
export class TokenStore extends Store<TokenState> {

  constructor() {
    super(createInitialState());
  }

}

