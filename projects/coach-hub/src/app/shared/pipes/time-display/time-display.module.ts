import { NgModule } from '@angular/core';
import { TimeDisplayPipe } from './time-display.pipe';

@NgModule({
  declarations: [
    TimeDisplayPipe
  ],
  exports: [
    TimeDisplayPipe
  ]
})
export class TimeDisplayModule {
}
