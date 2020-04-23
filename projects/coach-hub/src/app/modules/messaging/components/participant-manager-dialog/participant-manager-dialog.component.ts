import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { ParticipantManagerDialogMessageInterface } from '../../models/participant-manager-dialog-message.interface';
import { ThreadInterface } from '../../models/thread.interface';
import { ParticipantInterface } from '../../models/participant.interface';
import { FriendsQuery } from '../../state/friends/friends.query';
import { MessagingService } from '../../services/messaging.service';
import { ThreadParticipantsQuery } from '../../state/thread-participants/thread-participants.query';
import { UserParticipantInterface } from '../../state/threads/models/user-participant.interface';
import { ThreadParticipantsInterface } from '../../state/threads/models/thread-participants.interface';
import { FullNamePipe } from '../../../../shared/pipes/full-name/full-name.pipe';
import { UserInterface } from '../../../../state/authentication/models/user.interface';

@Component({
  selector: 'ch-participant-dialog',
  templateUrl: './participant-manager-dialog.component.html',
  styleUrls: [ './participant-manager-dialog.component.scss']
})
export class ParticipantManagerDialogComponent implements OnInit, OnDestroy {
  thread: ThreadParticipantsInterface;
  newParticipants: ParticipantInterface[] = [];
  friendList$: Observable<Partial<UserInterface>[]>;
  includeConversationHistory = true;
  displayFunc = new FullNamePipe().transform;

  private _subscriptions = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<ParticipantManagerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ParticipantManagerDialogMessageInterface,
    private service: MessagingService,
    private threadParticipantsQuery: ThreadParticipantsQuery,
    private friendsQuery: FriendsQuery) {
    console.log(data);
    this.thread = data.thread;
    // Set the friends list
    this.friendList$ = this.friendsQuery.selectAll();
  }

  ngOnInit() {
    // If the friends list has yet to be loaded
    if (!this.friendsQuery.loaded) {
      this._subscriptions.add(
        this.service.getContacts().subscribe()
      );
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  removeUser(user) {
    console.log('Remove User');
    console.log(user);
  }

  reportUser(user) {
    console.log('Report User');
    console.log(user);
  }

  onRecipientsUpdated($event) {
    this.newParticipants = $event;
  }

  close() {
    this.dialogRef.close();
  }
}
