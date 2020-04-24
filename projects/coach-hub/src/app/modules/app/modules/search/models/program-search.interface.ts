import { ProgramInterface } from '../../../models/program.interface';
import { CoachBaseProfileInterface } from '../../../models/coach-base-profile.interface';

export interface ProgramSearchInterface extends ProgramInterface {
  coach_base_profile: Partial<CoachBaseProfileInterface>;
}
