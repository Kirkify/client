import { ProgramInterface } from '../../app/models/program.interface';
import { CoachBaseProfileInterface } from '../../app/models/coach-base-profile.interface';

export interface ProgramSearchInterface extends ProgramInterface {
  coach_base_profile: Partial<CoachBaseProfileInterface>;
}
