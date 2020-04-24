import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagingService } from '../../services/messaging.service';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { ThreadMessagesQuery } from '../../state/thread-messages/thread-messages.query';
import { MessageInterface } from '../../models/message.interface';
import { ThreadsQuery } from '../../modules/threads/state/threads.query';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { ThreadsStore } from '../../modules/threads/state/threads.store';
import { ThreadParticipantsInterface } from '../../modules/threads/state/models/thread-participants.interface';
import { VerySimpleLoaderClass } from '../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { SimpleMessageType } from '../../../../shared/modules/simple-message/models/simple-message.type';
import { AuthenticationQuery } from '../../../../state/authentication/authentication.query';
import { UsersQuery } from '../../state/users/users.query';
import { UserInterface } from '../../../../state/authentication/models/user.interface';

@Component({
  selector: 'ch-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: [ './thread-detail.component.scss' ]
})
export class ThreadDetailComponent implements OnInit, OnDestroy {
  loader = new VerySimpleLoaderClass();
  errorMsg = new BehaviorSubject<SimpleMessageType>('');
  messages$: Observable<MessageInterface[]>;
  thread$: Observable<ThreadParticipantsInterface>;

  private _threadId: number;
  private _subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private service: MessagingService,
    private currentUserQuery: AuthenticationQuery,
    private threadsStore: ThreadsStore,
    private threadMessagesQuery: ThreadMessagesQuery,
    private usersQuery: UsersQuery,
    private threadsQuery: ThreadsQuery
  ) {
  }

  getUserFromId(id: number): Observable<Partial<UserInterface>> {
    return this.usersQuery.selectEntity(id);
  }

  ngOnInit() {
    // Grab the threadId from the route and cast to a number
    this._threadId = +this.route.snapshot.paramMap.get('id');

    this.thread$ = this.threadsQuery.selectThreadWithUserParticipants(this._threadId);
    this.messages$ = this.threadMessagesQuery.selectAllMessagesFromThreadId(this._threadId);

    // If the thread has yet to be loaded
    // Can be the case when this page is loaded before landing on the threads page
    if (!this.threadsQuery.hasEntity(this._threadId)) {
      this.errorMsg.next('');
      this.loader.setLoadingStatus(true);

      this._subscriptions.add(
        // The server service will mark the thread as read
        this.service.getThread(this._threadId).pipe(
          takeUntil(this.loader.getCancellableSubject()),
          catchError(err => {
            this.errorMsg.next(err);
            return throwError(err);
          }),
          finalize(() => this.loader.setLoadingStatus(false))
        ).subscribe()
      );
    } else {
      // Mark the thread as read
      this._subscriptions.add(
        this.service.markThreadAsRead(this._threadId).subscribe()
      );
    }

    // Set as active, this is so when messages are received over the socket, we know to mark them as read if the thread is active
    this.threadsStore.addActiveThreadId(this._threadId);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this.threadsStore.removeActiveThreadId(this._threadId);
  }
}
