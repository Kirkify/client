import { SportInterface } from './sport.interface';
import { CoachBaseProfileInterface } from './coach-base-profile.interface';

export interface CoachHubInitialStateInterface {
  sports: SportInterface[];
  coachBaseProfile: CoachBaseProfileInterface;
}
