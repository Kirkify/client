import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './components/landing/landing.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FooterModule } from '../footer/footer.module';


@NgModule({
  declarations: [ LandingComponent ],
  imports: [
    CommonModule,
    LandingRoutingModule,

    FooterModule,

    MatToolbarModule,
    MatButtonModule,
  ]
})
export class LandingModule {
}
