import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MessagingService } from '../../../../services/messaging.service';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadInterface } from '../../../../models/thread.interface';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { ThreadsQuery } from '../../state/threads.query';
import { ThreadMessagesQuery } from '../../../../state/thread-messages/thread-messages.query';
import { ThreadParticipantsQuery } from '../../../../state/thread-participants/thread-participants.query';
import { MessageInterface } from '../../../../models/message.interface';
import { ThreadUnreadInterface } from '../../../../models/thread-unread.interface';
import { VerySimpleLoaderClass } from '../../../../../../shared/modules/simple-loader/models/very-simple-loader.class';
import { SimpleMessageType } from '../../../../../../shared/modules/simple-message/models/simple-message.type';
import { UsersQuery } from '../../../../state/users/users.query';

@Component({
  selector: 'ch-thread-list',
  templateUrl: 'thread-list.component.html',
  styleUrls: [ 'thread-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadListComponent implements OnInit, OnDestroy {
  threads: Observable<ThreadUnreadInterface[]>;
  threadsLoaded: Observable<boolean>;
  loader = new VerySimpleLoaderClass();
  errorMsg = new BehaviorSubject<SimpleMessageType>('');

  private _subscriptions = new Subscription();

  constructor(private service: MessagingService,
              private route: ActivatedRoute,
              private router: Router,
              private usersQuery: UsersQuery,
              private threadsQuery: ThreadsQuery,
              private threadMessagesQuery: ThreadMessagesQuery,
              private threadParticipantsQuery: ThreadParticipantsQuery,
              ) {
    this.threads = this.threadsQuery.selectAllThreadsWithUnread();
    this.threadsLoaded = this.threadsQuery.select(store => store.loaded);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngOnInit() {
    if (!this.threadsQuery.loaded) {
      this.refresh();
    }
  }

  goToThread(thread: ThreadInterface) {
    this.router.navigate([ './', thread.id ], { relativeTo: this.route });
  }

  selectUserNameForMessage(message: MessageInterface) {
    return this.threadMessagesQuery.selectUserNameForMessage(message);
  }

  selectThreadNameForThread(thread: ThreadInterface) {
    return this.threadParticipantsQuery.selectThreadNameForThread(thread);
  }

  selectLatestMessageFromThread(thread: ThreadInterface): Observable<MessageInterface> {
    return this.threadMessagesQuery.selectLatestMessageFromThreadId(thread);
  }

  refresh() {
    this.errorMsg.next('');
    this.loader.setLoadingStatus(true);

    this._subscriptions.add(
      this.service.getThreads()
        .pipe(
          takeUntil(this.loader.getCancellableSubject()),
          catchError(err => {
            this.errorMsg.next(err);
            return throwError(err);
          }),
          finalize(() => this.loader.setLoadingStatus(false))
        ).subscribe()
    );
  }
}
