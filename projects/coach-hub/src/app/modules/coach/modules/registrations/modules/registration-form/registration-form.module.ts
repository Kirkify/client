import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './registration-form.component';
import { SimpleLoaderModule } from '../../../../../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../../../../../shared/modules/simple-message/simple-message.module';
import { ProgramAutocompleteModule } from '../../../programs/modules/program-autocomplete/program-autocomplete.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    RegistrationFormComponent
  ],
  exports: [
    RegistrationFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SimpleLoaderModule,
    SimpleMessageModule,
    ProgramAutocompleteModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule
  ]
})
export class RegistrationFormModule {
}
