import { CreateProgramInterface } from '../modules/coach/modules/programs/models/create-program.interface';
import { CoachBaseProfileInterface } from './coach-base-profile.interface';
import { ProgramPriceInterface } from './program-price.interface';
import { FormArray } from '@angular/forms';
import { FormInterface } from '../../../shared/modules/form-creator/models/form.interface';

export interface ProgramInterface extends CreateProgramInterface {
  id: number;
  user_id: number;
  registrations_count: number;
  created_at: string;
  updated_at: string;
  coach: Partial<CoachBaseProfileInterface>;
  prices: ProgramPriceInterface[];
  prices_form?: FormArray;
  form?: FormInterface;
}
