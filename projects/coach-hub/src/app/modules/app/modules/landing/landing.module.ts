import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { MainComponent } from './components/main/main.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    LandingComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,

    // Material Modules
    MatButtonModule
  ]
})
export class LandingModule { }
