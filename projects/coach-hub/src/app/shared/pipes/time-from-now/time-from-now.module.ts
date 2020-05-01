import { NgModule } from '@angular/core';
import { TimeFromNowPipe } from './time-from-now.pipe';

@NgModule({
  declarations: [
    TimeFromNowPipe
  ],
  exports: [
    TimeFromNowPipe
  ]
})
export class TimeFromNowModule {
}
