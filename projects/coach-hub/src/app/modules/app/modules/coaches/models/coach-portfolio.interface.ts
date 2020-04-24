import { CoachProfileInterface } from '../../../models/coach-profile.interface';
import { ProgramInterface } from '../../../models/program.interface';

export interface CoachPortfolioInterface {
  id: string;
  profiles: CoachProfileInterface[];
  programs: ProgramInterface[];
}
