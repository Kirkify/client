import { Moment } from 'moment';

export interface ProgramFormStateInterface {
  general: {
    program_title: string;
    program_description: string;
    category: number;
    registration_start: Moment;
    registration_end: Moment;
    program_start: Moment;
    program_end: Moment;
    location_id: number;
  };
}
