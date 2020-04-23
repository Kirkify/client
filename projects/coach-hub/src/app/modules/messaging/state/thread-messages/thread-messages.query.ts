import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ThreadMessagesState, ThreadMessagesStore } from './thread-messages.store';
import { MessageInterface } from '../../models/message.interface';
import { ThreadInterface } from '../../models/thread.interface';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CurrentUserQuery } from '../../../../state/current-user/current-user.query';
import { UsersQuery } from '../../../../state/users/users.query';

@Injectable({ providedIn: 'root' })
// TODO: Update this to sort by created_at
@QueryConfig({
  sortBy: 'id',
  sortByOrder: Order.DESC
})
export class ThreadMessagesQuery extends QueryEntity<ThreadMessagesState, MessageInterface> {
  constructor(
    protected store: ThreadMessagesStore,
    private currentUserQuery: CurrentUserQuery,
    private usersQuery: UsersQuery
  ) {
    super(store);
  }

  selectLatestMessageFromThreadId(thread: ThreadInterface): Observable<MessageInterface> {
    return this.selectAll({
      filterBy: entity => entity.thread_id === thread.id
    }).pipe(
      map(messages => messages[0])
    );
  }

  selectAllMessagesFromThreadId(id: number): Observable<MessageInterface[]> {
    return this.selectAll({
      filterBy: entity => entity.thread_id === id
    });
  }

  selectUserNameForMessage(message: MessageInterface) {
    return this.currentUserQuery.selectUserIfNotNull().pipe(
      mergeMap(currentUser => {
        if (currentUser.id === message.user_id) {
          return of('You');
        } else {
          return this.usersQuery.selectEntity(message.user_id).pipe(
            map(user => user.first_name)
          );
        }
      })
    );
  }
}
