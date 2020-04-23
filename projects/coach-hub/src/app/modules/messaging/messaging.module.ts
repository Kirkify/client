import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagingRoutingModule } from './messaging-routing.module';
import { InboxComponent } from './components/inbox/inbox.component';
import { MessagingComponent } from './messaging.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleLoaderModule } from '../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../shared/modules/simple-message/simple-message.module';
import { MatListModule } from '@angular/material/list';
import { ThreadListComponent } from './components/thread-list/thread-list.component';
import { ParticipantManagerDialogComponent } from './components/participant-manager-dialog/participant-manager-dialog.component';
import { ThreadMessageDisplayerComponent } from './components/thread-message-displayer/thread-message-displayer.component';
import { ThreadDetailComponent } from './components/thread-detail/thread-detail.component';
import { MessageCreatorComponent } from './components/message-creator/message-creator.component';


@NgModule({
  declarations: [
    MessagingComponent,
    ThreadListComponent,
    ThreadDetailComponent,
    ThreadMessageDisplayerComponent,
    MessageCreatorComponent,
    ParticipantManagerDialogComponent,
    InboxComponent
  ],
  imports: [
    CommonModule,
    MessagingRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    SimpleLoaderModule,
    SimpleMessageModule,

    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [
    ParticipantManagerDialogComponent
  ]
})
export class MessagingModule { }
