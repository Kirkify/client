import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCreatorLandingRoutingModule } from './form-creator-landing-routing.module';
import { FormCreatorLandingComponent } from './components/form-creator-landing/form-creator-landing.component';
import { RootComponent } from './root.component';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    RootComponent,
    FormCreatorLandingComponent
  ],
  imports: [
    CommonModule,
    FormCreatorLandingRoutingModule,

    MatButtonModule,
    MatIconModule
  ]
})
export class FormCreatorLandingModule { }
