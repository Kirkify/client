import { NgModule } from '@angular/core';
import { GenderDisplayPipe } from './gender-display.pipe';

@NgModule({
  declarations: [
    GenderDisplayPipe
  ],
  exports: [
    GenderDisplayPipe
  ]
})
export class GenderDisplayModule {
}
