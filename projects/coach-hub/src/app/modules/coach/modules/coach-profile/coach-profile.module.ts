import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachProfileRoutingModule } from './coach-profile-routing.module';
import { CoachProfileComponent } from './components/coach-profile/coach-profile.component';
import { CoachApplicationDisplayerModule } from './modules/coach-application-displayer/coach-application-displayer.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { SimpleRouterModule } from '../../../../shared/modules/simple-router/simple-router.module';
import { CoachBaseProfileFormModule } from '../coach-base-profile-form/coach-base-profile-form.module';

@NgModule({
  declarations: [
    CoachProfileComponent
  ],
  imports: [
    CommonModule,
    CoachProfileRoutingModule,

    SimpleRouterModule,
    CoachApplicationDisplayerModule,
    CoachBaseProfileFormModule,

    MatDividerModule
  ]
})
export class CoachProfileModule {
}
