import { CreateRegistrationInterface } from './create-registration.interface';

export interface RegistrationInterface extends CreateRegistrationInterface {
  id: number;
  created_at: string;
  updated_at: string;
}
