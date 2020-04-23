import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { MessageInterface } from '../../models/message.interface';

export interface ThreadMessagesState extends EntityState<MessageInterface> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'threadMessages' })
export class ThreadMessagesStore extends EntityStore<ThreadMessagesState, MessageInterface> {
  constructor() {
    super();
  }
}
