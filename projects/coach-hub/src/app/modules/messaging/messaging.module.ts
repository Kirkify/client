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
import { ParticipantManagerDialogComponent } from './components/participant-manager-dialog/participant-manager-dialog.component';
import { ThreadMessageDisplayerComponent } from './components/thread-message-displayer/thread-message-displayer.component';
import { ThreadDetailComponent } from './components/thread-detail/thread-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { AutocompleteChipsModule } from '../../shared/modules/autocomplete-chips/autocomplete-chips.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ThreadsModule } from './modules/threads/threads.module';
import { MessageCreatorModule } from './modules/message-creator/message-creator.module';
import { FullNameModule } from '../../shared/pipes/full-name/full-name.module';
import { TimeFromNowModule } from '../../shared/pipes/time-from-now/time-from-now.module';


@NgModule({
  declarations: [
    MessagingComponent,
    ThreadDetailComponent,
    ThreadMessageDisplayerComponent,
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
    ThreadsModule,
    MessageCreatorModule,
    AutocompleteChipsModule,
    FullNameModule,
    TimeFromNowModule,

    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  entryComponents: [
    ParticipantManagerDialogComponent
  ]
})
export class MessagingModule {
}
