import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomeACoachComponent } from './components/become-a-coach/become-a-coach.component';
import { BecomeACoachRoutingModule } from './become-a-coach-routing.module';
import { RootComponent } from './root.component';
import { CoachBaseProfileFormModule } from '../coach-base-profile-form/coach-base-profile-form.module';

@NgModule({
  declarations: [
    RootComponent,
    BecomeACoachComponent
  ],
  imports: [
    CommonModule,
    BecomeACoachRoutingModule,
    CoachBaseProfileFormModule
  ]
})
export class BecomeACoachModule { }
