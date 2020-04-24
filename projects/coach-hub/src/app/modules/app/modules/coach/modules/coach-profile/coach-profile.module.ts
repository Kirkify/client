import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachProfileRoutingModule } from './coach-profile-routing.module';
import { CoachProfileComponent } from './components/coach-profile/coach-profile.component';
import { RootComponent } from './root.component';
import { CoachBaseProfileDisplayerModule } from './modules/coach-base-profile-displayer/coach-base-profile-displayer.module';
import { CoachApplicationDisplayerModule } from './modules/coach-application-displayer/coach-application-displayer.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    RootComponent,
    CoachProfileComponent,
  ],
  imports: [
    CommonModule,
    CoachProfileRoutingModule,
    CoachBaseProfileDisplayerModule,
    CoachApplicationDisplayerModule,

    MatButtonModule,
    MatDividerModule
  ]
})
export class CoachProfileModule { }
