import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEditorComponent } from './form-editor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    FormEditorComponent
  ],
  exports: [
    FormEditorComponent
  ],
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule
  ]
})
export class FormEditorModule {
}
