import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleMessageComponent } from './simple-message.component';

@NgModule({
  declarations: [
    SimpleMessageComponent,
  ],
  exports: [
    SimpleMessageComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class SimpleMessageModule { }
