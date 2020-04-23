import { ParticipantInterface } from '../../../models/participant.interface';
import { UserInterface } from '../../../../../state/authentication/models/user.interface';

export interface UserParticipantInterface extends Partial<UserInterface> {
  participant: ParticipantInterface;
  currentUser: boolean;
}
