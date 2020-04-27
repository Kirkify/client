import { TokenInterface } from './token.interface';

export interface UpdateUserInterface {
  token: TokenInterface;
  rememberMe?: boolean;
  isTokenRefreshing?: boolean;
}
