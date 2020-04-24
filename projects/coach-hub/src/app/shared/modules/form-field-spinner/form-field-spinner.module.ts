import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldSpinnerComponent } from './form-field-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    FormFieldSpinnerComponent
  ],
  exports: [
    FormFieldSpinnerComponent
  ]
})
export class FormFieldSpinnerModule { }
