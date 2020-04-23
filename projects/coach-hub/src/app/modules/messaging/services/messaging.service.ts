import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICompose } from '../models/compose.interface';
import { ParticipantInterface } from '../models/participant.interface';
import { IThreadReply } from '../models/thread-reply.interface';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { ThreadsStore } from '../state/threads/threads.store';
import { JsonResponseInterface } from '../../../shared/models/json-response.interface';
import { GetThreadsResponseInterface } from './models/get-threads-response.interface';
import { ThreadsQuery } from '../state/threads/threads.query';
import { ThreadMessagesStore } from '../state/thread-messages/thread-messages.store';
import { ThreadMessagesQuery } from '../state/thread-messages/thread-messages.query';
import { ThreadParticipantsStore } from '../state/thread-participants/thread-participants.store';
import { GetThreadResponseInterface } from './models/get-thread-response.interface';
import { UsersStore } from '../../../state/users/users.store';
import { MarkAsReadOrUnreadResponseInterface } from './models/mark-as-read-or-unread-response.interface';
import { MessageCreatedResponseInterface } from './models/message-created-response.interface';
import { WebSocketQuery } from '../../../core/services/web-socket/state/web-socket.query';
import { UserInterface } from '../../../core/services/authentication/models/user.interface';
import { FriendsStore } from '../state/friends/friends.store';
import { ThreadParticipantsQuery } from '../state/thread-participants/thread-participants.query';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private _basePath = '/messaging';

  constructor(
    private http: HttpClient,
    private threadsStore: ThreadsStore,
    private threadsQuery: ThreadsQuery,
    private threadMessagesStore: ThreadMessagesStore,
    private threadMessagesQuery: ThreadMessagesQuery,
    private usersStore: UsersStore,
    private friendsStore: FriendsStore,
    private webSocketQuery: WebSocketQuery,
    private threadParticipantsQuery: ThreadParticipantsQuery,
    private threadParticipantsStore: ThreadParticipantsStore) {

    // Whenever we receive a new message over the socket
    this.webSocketQuery.messageCreatedResponse().pipe(
      // Update the store
      tap(msg => {
        return this._updateStoreFromNewMessage(msg);
      }),
      mergeMap(msg => {
        // If the threadId is currently active
        return this.threadsQuery.isThreadCurrentlyActive(msg.thread.id).pipe(
          take(1),
          mergeMap(isActive => {
            if (isActive) {
              return this.markThreadAsRead(msg.thread.id);
            }
            return of(null);
          })
        );
      })
    ).subscribe();
  }

  getUnreadCount() {
    const path = this._basePath + '/unread-count';

    return this.http
      .get<JsonResponseInterface<number>>(environment.api_url + path).pipe(
        map(res => res.data),
        tap(unread => this.threadsStore.update({ unread }))
      );
  }

  getThreads(): Observable<GetThreadsResponseInterface> {

    const path = this._basePath + '/threads';

    return this.http
      .get<JsonResponseInterface<GetThreadsResponseInterface>>(environment.api_url + path).pipe(
        tap(() => this.threadsStore.update({ loaded: true })),
        map(res => res.data),
        tap(res => {
          this.threadsStore.add(res.threads);
          this.threadMessagesStore.add(res.messages);
          this.threadParticipantsStore.add(res.participants);
          this.usersStore.add(res.users);
        })
      );
  }

  getContacts(): Observable<Partial<UserInterface>[]> {
    const path = this._basePath + '/contacts';

    return this.http
      .get<JsonResponseInterface<Partial<UserInterface>[]>>(environment.api_url + path).pipe(
        map(res => res.data),
        tap(friends => {
          this.friendsStore.update({ loaded: true });
          this.friendsStore.set(friends);
        })
      );
  }

  newThreadMessageReceived(res: MessageCreatedResponseInterface) {
    this._updateStoreFromNewMessage(res);
  }

  markThreadAsRead(threadId: number): Observable<ParticipantInterface> {
    const path = this._basePath + `/thread/mark-as-read/${threadId}`;

    return this.http
      .get<JsonResponseInterface<MarkAsReadOrUnreadResponseInterface>>(environment.api_url + path).pipe(
        map(res => res.data.participant),
        tap(participant => {
          this.threadParticipantsStore.update(participant.id, participant);
        })
      );
  }

  markThreadAsUnread(threadId: number): Observable<ParticipantInterface> {
    const path = this._basePath + `/thread/mark-as-unread/${threadId}`;

    return this.http
      .get<JsonResponseInterface<MarkAsReadOrUnreadResponseInterface>>(environment.api_url + path).pipe(
        map(res => res.data.participant),
        tap(participant => {
          this.threadParticipantsStore.update(participant.id, participant);
        })
      );
  }

  getThread(id: number): Observable<GetThreadResponseInterface> {
    const path = this._basePath + `/thread/${id}`;

    return this.http
      .get<JsonResponseInterface<GetThreadResponseInterface>>(environment.api_url + path).pipe(
        map(res => res.data),
        tap(res => {
          this.threadsStore.add(res.thread);
          this.threadMessagesStore.add(res.messages);
          this.threadParticipantsStore.add(res.participants);
          this.usersStore.add(res.users);
        })
      );
  }


  compose(message: ICompose): Observable<MessageCreatedResponseInterface> {

    const path = this._basePath + '/compose';

    return this.http
      .post<JsonResponseInterface<MessageCreatedResponseInterface>>(environment.api_url + path, JSON.stringify(message)).pipe(
        map(res => res.data),
        tap(res => {
          this.threadsStore.add(res.thread);
          this.threadMessagesStore.add(res.message);
          this.threadParticipantsStore.add(res.participants);
          this.usersStore.add(res.users);
        })
      );
  }

  reply(reply: IThreadReply): Observable<MessageCreatedResponseInterface> {

    const path = this._basePath + '/thread/' + reply.thread_id;

    return this.http
      .post<JsonResponseInterface<MessageCreatedResponseInterface>>(environment.api_url + path, JSON.stringify(reply)).pipe(
        map(res => res.data),
        tap(res => this._updateStoreFromNewMessage(res))
      );
  }

  private _updateStoreFromNewMessage(res: MessageCreatedResponseInterface) {
    this.threadsStore.upsert(res.thread.id, res.thread);
    this.threadMessagesStore.add(res.message);

    // TODO: Akita API should be improved to allow batch updates in one call
    for (const participant of res.participants) {
      this.threadParticipantsStore.upsert(participant.id, participant);
    }
    for (const user of res.users) {
      this.usersStore.upsert(user.id, user);
    }
  }
}
