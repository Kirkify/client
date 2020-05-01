import { RegistrationInterface } from './registration.interface';
import { ProgramInterface } from '../../../../app/models/program.interface';

export interface RegistrationProgramInterface extends RegistrationInterface {
  program: ProgramInterface;
}
