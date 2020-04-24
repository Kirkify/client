import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteChipsComponent } from './autocomplete-chips.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
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
