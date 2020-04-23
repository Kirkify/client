import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ParticipantInterface } from '../../models/participant.interface';

export interface ThreadParticipantsState extends EntityState<ParticipantInterface> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'threadParticipants' })
export class ThreadParticipantsStore extends EntityStore<ThreadParticipantsState, ParticipantInterface> {
  constructor() {
    super();
  }
}
