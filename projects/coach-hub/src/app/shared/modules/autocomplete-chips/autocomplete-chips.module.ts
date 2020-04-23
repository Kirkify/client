import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteChipsComponent } from './autocomplete-chips.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatChipsModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { FormFieldSpinnerModule } from '../form-field-spinner/form-field-spinner.module';

@NgModule({
  declarations: [
    AutocompleteChipsComponent
  ],
  exports: [
    AutocompleteChipsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldSpinnerModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class AutocompleteChipsModule { }
