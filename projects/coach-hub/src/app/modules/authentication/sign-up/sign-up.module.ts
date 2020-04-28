import { NgModule } from '@angular/core';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyComponent } from './components/verify/verify.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SimpleLoaderModule } from '../../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../../shared/modules/simple-message/simple-message.module';
import { FormContainerModule } from '../../../shared/modules/form-container/form-container.module';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    SignUpComponent,
    VerifyComponent
  ],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,

    FormContainerModule,
    SimpleLoaderModule,
    SimpleMessageModule,

    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
})
export class SignUpModule {
}
