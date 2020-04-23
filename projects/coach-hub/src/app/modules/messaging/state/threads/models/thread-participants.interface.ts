import { ThreadInterface } from '../../../models/thread.interface';
import { UserParticipantInterface } from './user-participant.interface';

export interface ThreadParticipantsInterface extends ThreadInterface {
  userParticipants: UserParticipantInterface[];
}
