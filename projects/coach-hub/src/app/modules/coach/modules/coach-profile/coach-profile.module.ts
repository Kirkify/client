import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachProfileRoutingModule } from './coach-profile-routing.module';
import { CoachProfileComponent } from './components/coach-profile/coach-profile.component';
import { CoachBaseProfileDisplayerModule } from './modules/coach-base-profile-displayer/coach-base-profile-displayer.module';
import { CoachApplicationDisplayerModule } from './modules/coach-application-displayer/coach-application-displayer.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { SimpleRouterModule } from '../../../../shared/modules/simple-router/simple-router.module';

@NgModule({
  declarations: [
    CoachProfileComponent,
  ],
  imports: [
    CommonModule,
    CoachProfileRoutingModule,

    SimpleRouterModule,
    CoachBaseProfileDisplayerModule,
    CoachApplicationDisplayerModule,

    MatButtonModule,
    MatDividerModule
  ]
})
export class CoachProfileModule {
}
