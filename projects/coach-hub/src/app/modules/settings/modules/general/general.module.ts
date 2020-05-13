import { NgModule } from '@angular/core';
import { GeneralListComponent } from './components/general-list/general-list.component';
import { GeneralRoutingModule } from './general-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { UserComponent } from './components/user/user.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EmailComponent } from './components/email/email.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SimpleLoaderModule } from '../../../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../../../shared/modules/simple-message/simple-message.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormContainerModule } from '../../../../shared/modules/form-container/form-container.module';

@NgModule({
  declarations: [
    GeneralListComponent,
    UserComponent,
    UserProfileComponent,
    EmailComponent,
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,

    SimpleLoaderModule,
    SimpleMessageModule,
    FormContainerModule,

    MatListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class GeneralModule { }
