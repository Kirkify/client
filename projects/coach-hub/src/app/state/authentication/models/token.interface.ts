import { UserInterface } from './user.interface';
import { RoleEnum } from './role.enum';

export interface TokenInterface {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
  user: UserInterface;
  roles: RoleEnum[];
}

