import { NgModule } from '@angular/core';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { IdentifyComponent } from './components/identify/identify.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ResetComponent } from './components/reset/reset.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SimpleMessageModule } from '../../../shared/modules/simple-message/simple-message.module';
import { SimpleLoaderModule } from '../../../shared/modules/simple-loader/simple-loader.module';
import { ResetPasswordModule } from '../reset-password/reset-password.module';
import { FormContainerModule } from '../../../shared/modules/form-container/form-container.module';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    IdentifyComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    ReactiveFormsModule,

    RecaptchaModule,
    RecaptchaFormsModule,

    FormContainerModule,
    ResetPasswordModule,

    SimpleMessageModule,
    SimpleLoaderModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ]
})
export class ForgotPasswordModule {
}
