import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ThreadInterface } from '../../models/thread.interface';
import { FormControl } from '@angular/forms';
import { MessagingService } from '../../services/messaging.service';
import { IThreadReply } from '../../models/thread-reply.interface';
import { BehaviorSubject, Observable, of, Subscription, throwError } from 'rxjs';
import { catchError, finalize, map, takeUntil, tap } from 'rxjs/operators';
import { ThreadParticipantsQuery } from '../../state/thread-participants/thread-participants.query';
import { ThreadsQuery } from '../../state/threads/threads.query';
import { ParticipantInterface } from '../../models/participant.interface';
import { FriendsQuery } from '../../state/friends/friends.query';
import { ICompose } from '../../models/compose.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ParticipantManagerDialogComponent } from '../participant-manager-dialog/participant-manager-dialog.component';
import { ParticipantManagerDialogMessageInterface } from '../../models/participant-manager-dialog-message.interface';
import { ThreadParticipantsInterface } from '../../state/threads/models/thread-participants.interface';
import { CurrentUserQuery } from '../../../../state/current-user/current-user.query';
import { FullNamePipe } from '../../../../shared/pipes/full-name/full-name.pipe';
import { UserInterface } from '../../../../state/authentication/models/user.interface';
import { SimpleMessageType } from '../../../../shared/modules/simple-message/models/simple-message.type';

@Component({
  selector: 'ch-message-creator',
  templateUrl: './message-creator.component.html',
  styleUrls: ['./message-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageCreatorComponent implements OnInit, OnDestroy {
  @Input() thread: ThreadParticipantsInterface;

  message = new FormControl('');
  subject = new FormControl('');
  loader = new VerySimpleLoaderClass();
  errorMsg = new BehaviorSubject<SimpleMessageType>('');
  participants: ParticipantInterface[] = [];
  friendList$: Observable<Partial<UserInterface>[]>;
  displayFunc = new FullNamePipe().transform;

  private _subscriptions = new Subscription();

  constructor(
    private service: MessagingService,
    private currentUserQuery: CurrentUserQuery,
    private friendsQuery: FriendsQuery,
    private threadsQuery: ThreadsQuery,
    private threadParticipantsQuery: ThreadParticipantsQuery,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    // Set the friends list
    this.friendList$ = this.friendsQuery.selectAll();
  }

  ngOnInit() {
    // If the friends list has yet to be loaded
    if (!this.thread && !this.friendsQuery.loaded) {
      this._subscriptions.add(
        this.service.getContacts().subscribe()
      );
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  onRecipientsUpdated($event) {
    this.participants = $event;
  }

  selectManageParticipantsMessage(thread: ThreadInterface) {
    return this.threadParticipantsQuery.selectParticipantsFromThreadId(thread.id).pipe(
      map(participants => {
        if (participants.length > 2) {
          return 'Manage group participants';
        } else {
          return 'Add participants';
        }
      })
    );
  }

  getIsCurrentUserAnAdmin(thread: ThreadParticipantsInterface) {

    const currentParticipant = thread.userParticipants.find(x => x.currentUser === true);

    return currentParticipant && currentParticipant.participant.is_admin;
  }

  getIsThreadUnread(thread: ThreadParticipantsInterface) {
    const currentParticipant = thread.userParticipants.find(x => x.currentUser === true);

    return this.threadParticipantsQuery.isThreadUnreadForParticipant(thread, currentParticipant.participant);
  }

  selectThreadName() {
    if (this.thread) {
      return this.threadParticipantsQuery.selectThreadNameForThread(this.thread);
    } else {
      return of('New Message');
    }
  }

  openParticipantManager() {
    this.dialog.open(ParticipantManagerDialogComponent, {
      // panelClass: 'full-bleed-dialog',
      data: {
        thread: this.thread
      } as ParticipantManagerDialogMessageInterface
    });
  }

  markThreadAsUnread(thread: ThreadInterface) {
    this._subscriptions.add(
      this.service.markThreadAsUnread(thread.id).subscribe()
    );
  }

  markThreadAsRead(thread: ThreadInterface) {
    this._subscriptions.add(
      this.service.markThreadAsRead(thread.id).subscribe()
    );
  }

  onSubmit() {
    if (this.message.value.trim() === '') {
      this.errorMsg.next('You cannot send a blank message');
      return;
    }
    if (this.thread) {
      const reply = {
        thread_id: this.thread.id,
        body: this.message.value
      } as IThreadReply;

      this.loader.setLoadingStatus(true);

      this._subscriptions.add(
        this.service.reply(reply).pipe(
          takeUntil(this.loader.getCancellableSubject()),
          catchError(err => {
            this.errorMsg.next(err);
            return throwError(err);
          }),
          finalize(() => this.loader.setLoadingStatus(false))
        ).subscribe(() => this.message.setValue(''))
      );

    } else {
      // Get values for a new message
      const msg = {
        participants: this.participants,
        subject: this.subject.value,
        body: this.message.value
      } as ICompose;

      this.loader.setLoadingStatus(true);

      this._subscriptions.add(
        this.service.compose(msg).pipe(
          takeUntil(this.loader.getCancellableSubject()),
          finalize(() => this.loader.setLoadingStatus(false)),
          catchError(err => {
            this.errorMsg.next(err);
            return throwError(err);
          }),
        ).subscribe(() => {
          this.snackBar.open('Your message has been sent.', 'close', {duration: 6000});
          this.router.navigate(['../'], { relativeTo: this.route });
        })
      );
    }
  }
}
