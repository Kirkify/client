import { CoachProfileInterface } from '../../app/models/coach-profile.interface';
import { ProgramInterface } from '../../app/models/program.interface';
import { CoachBaseProfileInterface } from '../../app/models/coach-base-profile.interface';

export interface CoachPortfolioInterface {
  id: string;
  base: CoachBaseProfileInterface;
  profiles: CoachProfileInterface[];
  programs: ProgramInterface[];
}
