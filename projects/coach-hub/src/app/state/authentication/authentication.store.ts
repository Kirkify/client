import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { UserInterface } from './models/user.interface';
import { AccessTokenInterface } from './models/access-token.interface';
import { RoleEnum } from './models/role.enum';
import { TokenInterface } from './models/token.interface';

export interface AuthenticationState {
  user: UserInterface;
  accessToken: AccessTokenInterface;
  roles: RoleEnum[];
  rememberMe: boolean;
  isTokenRefreshing: boolean;
}

export function createInitialState(): AuthenticationState {
  return {
    user: null,
    accessToken: null,
    roles: [],
    rememberMe: false,
    isTokenRefreshing: false
  };
}

export const AUTHENTICATION_STORE_NAME = 'authentication';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: AUTHENTICATION_STORE_NAME })
export class AuthenticationStore extends Store<AuthenticationState> {

  constructor() {
    super(createInitialState());
  }

  updateUser(token: TokenInterface, rememberMe?: boolean) {
    if (rememberMe === undefined) {
      rememberMe = this.getValue().rememberMe;
    }

    this.update({
      user: token.user,
      accessToken: {
        value: token.access_token,
        token_type: token.token_type,
        expires_in: token.expires_in
      },
      roles: token.roles,
      rememberMe
    });
  }
}

