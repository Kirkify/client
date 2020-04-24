import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ThreadParticipantsState, ThreadParticipantsStore } from './thread-participants.store';
import { ParticipantInterface } from '../../models/participant.interface';
import { ThreadInterface } from '../../models/thread.interface';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthenticationQuery } from '../../../../state/authentication/authentication.query';
import { FullNamePipe } from '../../../../shared/pipes/full-name/full-name.pipe';
import { UsersQuery } from '../users/users.query';
import { UserParticipantInterface } from '../../modules/threads/state/models/user-participant.interface';

@Injectable({ providedIn: 'root' })
export class ThreadParticipantsQuery extends QueryEntity<ThreadParticipantsState, ParticipantInterface> {
  constructor(
    protected store: ThreadParticipantsStore,
    private currentUserQuery: AuthenticationQuery,
    private usersQuery: UsersQuery
    ) {
    super(store);
  }

  isThreadUnreadForParticipant(thread: ThreadInterface, participant: ParticipantInterface) {
    return !participant.hasOwnProperty('last_read') ||
           participant.last_read === '' ||
           new Date(thread.updated_at) > new Date(participant.last_read);
  }

  selectCurrentUserParticipantFromThread(thread: ThreadInterface) {
    return this.currentUserQuery.selectUserIfNotNull().pipe(
      mergeMap(user => this.selectAll({
        filterBy: entity => entity.thread_id === thread.id && entity.user_id === user.id
      }).pipe(
        map(participants => {
          console.log('selectCurrentUserParticipantFromThread');
          console.log(participants);
          return participants[0];
        })
      )
    ));
  }

  selectIsThreadUnreadForCurrentUser(thread: ThreadInterface) {
    return this.selectCurrentUserParticipantFromThread(thread).pipe(
      map(participant => this.isThreadUnreadForParticipant(thread, participant))
    );
  }

  selectParticipantsFromThreadId(id: number) {
    return this.selectAll({
      filterBy: entity => entity.thread_id === id
    });
  }

  selectUserParticipantsFromThreadId(id: number): Observable<UserParticipantInterface[]> {
    return this.selectParticipantsFromThreadId(id).pipe(
      mergeMap(participants => {
        return this.usersQuery.selectMany(participants.map(p => p.user_id)).pipe(
          map(users => {
            return users.map(user => {
              const participant = participants.find(x => x.user_id === user.id);
              return {
                ...user,
                currentUser: participant.current_user === true,
                participant
              };
            });
          })
        );
      })
    );
  }

  selectThreadNameForThread(thread: ThreadInterface) {
    return this.currentUserQuery.selectUserIfNotNull().pipe(
      map(currentUser => currentUser.id),
      mergeMap(currentUserId => this.selectParticipantsFromThreadId(thread.id).pipe(
        map(participants => participants.filter(p => p.user_id !== currentUserId)),
        mergeMap(participants => this.usersQuery.selectMany(participants.map(p => p.user_id)).pipe(
          map(users => {
            // If there is more then 1 participant
            if (users.length > 1) {
              // And a subject has been set
              if (thread.subject !== '') {
                return thread.subject;
              }
            }
            // Else just use the fullNamePipe
            const fullNamePipe = new FullNamePipe();
            return fullNamePipe.transform(users);
          })
        ))
      ))
    );
  }
}
