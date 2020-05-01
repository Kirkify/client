import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleMessageModule } from '../../../../../../shared/modules/simple-message/simple-message.module';
import { ProgramAutocompleteComponent } from './program-autocomplete.component';
import { FormFieldSpinnerModule } from '../../../../../../shared/modules/form-field-spinner/form-field-spinner.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ProgramAutocompleteComponent
  ],
  exports: [
    ProgramAutocompleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SimpleMessageModule,
    FormFieldSpinnerModule,

    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ProgramAutocompleteModule {
}
