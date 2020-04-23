import { ParticipantInterface } from './participant.interface';

export interface ICompose {
  participants: ParticipantInterface[];
  subject?: string;
  body: string;
}
