import { NgModule } from '@angular/core';
import { SecurityRoutingModule } from './security-routing.module';
import { PasswordComponent } from './password/password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SimpleLoaderModule } from '../../../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../../../shared/modules/simple-message/simple-message.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ PasswordComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SecurityRoutingModule,

    SimpleLoaderModule,
    SimpleMessageModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,

    MatButtonModule
  ],
})
export class SecurityModule {
}
