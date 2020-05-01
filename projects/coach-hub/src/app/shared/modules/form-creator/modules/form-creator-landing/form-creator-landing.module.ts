import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCreatorLandingRoutingModule } from './form-creator-landing-routing.module';
import { FormCreatorLandingComponent } from './components/form-creator-landing/form-creator-landing.component';
import { SimpleRouterModule } from '../../../simple-router/simple-router.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    FormCreatorLandingComponent
  ],
  imports: [
    CommonModule,
    FormCreatorLandingRoutingModule,

    SimpleRouterModule,

    MatButtonModule,
    MatIconModule
  ]
})
export class FormCreatorLandingModule {
}
