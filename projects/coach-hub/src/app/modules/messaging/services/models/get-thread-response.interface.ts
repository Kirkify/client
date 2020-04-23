import { ThreadInterface } from '../../models/thread.interface';
import { MessageInterface } from '../../models/message.interface';
import { ParticipantInterface } from '../../models/participant.interface';
import { UserInterface } from '../../../../state/authentication/models/user.interface';

export interface GetThreadResponseInterface {
  thread: ThreadInterface;
  messages: MessageInterface[];
  participants: ParticipantInterface[];
  users: Partial<UserInterface>[];
}
