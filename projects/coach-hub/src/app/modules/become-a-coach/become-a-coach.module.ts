import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomeACoachComponent } from './components/become-a-coach/become-a-coach.component';
import { BecomeACoachRoutingModule } from './become-a-coach-routing.module';
import { CoachBaseProfileFormModule } from '../coach/modules/coach-base-profile-form/coach-base-profile-form.module';
import { SimpleRouterModule } from '../../shared/modules/simple-router/simple-router.module';

@NgModule({
  declarations: [
    BecomeACoachComponent
  ],
  imports: [
    CommonModule,
    BecomeACoachRoutingModule,

    SimpleRouterModule,
    CoachBaseProfileFormModule
  ]
})
export class BecomeACoachModule { }
