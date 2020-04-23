import { ThreadInterface } from '../../models/thread.interface';
import { MessageInterface } from '../../models/message.interface';
import { ParticipantInterface } from '../../models/participant.interface';
import { UserInterface } from '../../../../core/services/authentication/models/user.interface';

export interface MessageCreatedResponseInterface {
  thread: ThreadInterface;
  message: MessageInterface;
  participants: ParticipantInterface[];
  users: Partial<UserInterface>[];
}
