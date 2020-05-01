import { CreateLocationInterface } from './create-location.interface';

export interface LocationInterface extends CreateLocationInterface {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}
