import { CoachProfileInterface } from '../../app/models/coach-profile.interface';
import { ProgramInterface } from '../../app/models/program.interface';

export interface CoachPortfolioInterface {
  id: string;
  profiles: CoachProfileInterface[];
  programs: ProgramInterface[];
}
