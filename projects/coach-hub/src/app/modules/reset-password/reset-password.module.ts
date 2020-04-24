import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { SimpleLoaderModule } from '../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../shared/modules/simple-message/simple-message.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ResetPasswordFormComponent
  ],
  exports: [
    ResetPasswordFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    SimpleLoaderModule,
    SimpleMessageModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ResetPasswordModule { }
