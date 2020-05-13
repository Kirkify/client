import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SimpleLoaderModule } from '../../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../../shared/modules/simple-message/simple-message.module';
import { FormContainerModule } from '../../../shared/modules/form-container/form-container.module';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,

    ReactiveFormsModule,

    FormContainerModule,
    SimpleLoaderModule,
    SimpleMessageModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule
  ],
})
export class LoginModule { }
