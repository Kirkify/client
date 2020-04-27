import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { UserInterface } from './models/user.interface';
import { AccessTokenInterface } from './models/access-token.interface';
import { RoleEnum } from './models/role.enum';
import { TokenInterface } from './models/token.interface';
import { UpdateUserInterface } from './models/update-user.interface';

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

  updateUser(params: UpdateUserInterface) {

    const {
      rememberMe = this.getValue().rememberMe,
      isTokenRefreshing = this.getValue().isTokenRefreshing
    } = params;

    this.update({
      user: params.token.user,
      accessToken: {
        value: params.token.access_token,
        token_type: params.token.token_type,
        expires_in: params.token.expires_in
      },
      roles: params.token.roles,
      rememberMe,
      isTokenRefreshing
    });
  }

  updateRefreshToken(isTokenRefreshing: boolean) {
    this.update({ isTokenRefreshing });
  }
}

