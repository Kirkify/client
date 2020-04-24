import { RegistrationInterface } from './registration.interface';
import { ProgramInterface } from '../../../../../models/program.interface';

export interface RegistrationProgramInterface extends RegistrationInterface {
  program: ProgramInterface;
}
