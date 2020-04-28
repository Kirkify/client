import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    FormContainerComponent
  ],
  exports: [
    FormContainerComponent
  ],
  imports: [
    CommonModule,

    MatCardModule
  ]
})
export class FormContainerModule { }
