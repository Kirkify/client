import { NgModule } from '@angular/core';
import { TimeFromNowPipe } from './time-from-now/time-from-now.pipe';
import { TimeDisplayPipe } from './time-display/time-display.pipe';
import { FullNamePipe } from './full-name/full-name.pipe';
import { GenderDisplayPipe } from './gender-display/gender-display.pipe';

@NgModule({
  declarations: [
    TimeFromNowPipe,
    TimeDisplayPipe,
    FullNamePipe,
    GenderDisplayPipe,
  ],
  exports: [
    TimeFromNowPipe,
    TimeDisplayPipe,
    FullNamePipe,
    GenderDisplayPipe,
  ]
})
export class SharedPipesModule {
}
