import { UserInterface } from '../../../../../../state/authentication/models/user.interface';
import { ParticipantInterface } from '../../../../models/participant.interface';

export interface UserParticipantInterface extends Partial<UserInterface> {
  participant: ParticipantInterface;
  currentUser: boolean;
}
