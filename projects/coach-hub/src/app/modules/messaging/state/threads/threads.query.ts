import { QueryConfig, QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ThreadsState, ThreadsStore } from './threads.store';
import { ThreadInterface } from '../../models/thread.interface';
import { ThreadSortByEnum } from './models/thread-sort-by.enum';
import { auditTime, map, mergeMap } from 'rxjs/operators';
import { ThreadParticipantsQuery } from '../thread-participants/thread-participants.query';
import { combineLatest, Observable } from 'rxjs';
import { ThreadParticipantsInterface } from './models/thread-participants.interface';
import { ThreadUnreadInterface } from '../../models/thread-unread.interface';
import { AuthenticationQuery } from '../../../../state/authentication/authentication.query';

const sortBy = (a, b, state) => {
  return ( state.sortBy === ThreadSortByEnum.Recent ? sortByDate(a.updated_at, b.updated_at, 'asc') : sortByDate(a, b, 'asc') );
};

@Injectable({ providedIn: 'root' })
@QueryConfig({ sortBy })
export class ThreadsQuery extends QueryEntity<ThreadsState, ThreadInterface> {
  constructor(
    protected store: ThreadsStore,
    private threadParticipantsQuery: ThreadParticipantsQuery,
    private currentUserQuery: AuthenticationQuery
  ) {
    super(store);
  }

  get loaded() {
    return this.getValue().loaded;
  }

  isThreadCurrentlyActive(threadId: number) {
    return this.select(state => state.active).pipe(
      map(state => state.includes(threadId))
    );
  }

  selectThreadWithUserParticipants(threadId: number): Observable<ThreadParticipantsInterface> {
    return combineLatest(
      this.selectEntity(threadId),
      this.threadParticipantsQuery.selectUserParticipantsFromThreadId(threadId)
    ).pipe(
      auditTime(1),
      map(([ thread, userParticipants ]) => ({
        ...thread,
        userParticipants
      }))
    );
  }

  selectAllThreadsWithUnread(): Observable<ThreadUnreadInterface[]> {
    return combineLatest(
      this.selectAll(),
      this.currentUserQuery.selectUserIfNotNull(),
      this.threadParticipantsQuery.selectAll()
    ).pipe(
      auditTime(1),
      mergeMap(([ threads, currentUser ]) => this.threadParticipantsQuery.selectAll({
        filterBy: entity => entity.user_id === currentUser.id
      }).pipe(
        map(participants => {
          return threads.map(thread => {
            const participant = participants.find(x => x.thread_id === thread.id);
            return {
              ...thread,
              unread: participant ? this.threadParticipantsQuery.isThreadUnreadForParticipant(thread, participant) : false
            };
          });
        })
      ))
    );
  }
}
