import { CreateProgramPriceInterface } from '../../../../../models/create-program-price.interface';

export interface CreateProgramInterface {
  program_title: string;
  program_description: string;
  category: number;
  registration_start: string;
  registration_end: string;
  program_start: string;
  program_end: string;
  location_id: number;
  tags: number[];
  prices: CreateProgramPriceInterface[];
}
