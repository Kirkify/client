import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachApplicationRoutingModule } from './coach-application-routing.module';
import { CoachApplicationComponent } from './components/coach-application/coach-application.component';
import { SportDisplayerComponent } from './components/sport-displayer/sport-displayer.component';
import { MinCharacterDisplayerComponent } from './components/min-character-displayer/min-character-displayer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleMessageModule } from '../../../../../../shared/modules/simple-message/simple-message.module';
import { SimpleLoaderModule } from '../../../../../../shared/modules/simple-loader/simple-loader.module';
import { CoachApplicationFormComponent } from './components/coach-application-form/coach-application-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SimpleRouterModule } from '../../../../../../shared/modules/simple-router/simple-router.module';

@NgModule({
  declarations: [
    CoachApplicationComponent,
    SportDisplayerComponent,
    MinCharacterDisplayerComponent,
    CoachApplicationFormComponent
  ],
  exports: [
    CoachApplicationFormComponent
  ],
  imports: [
    CommonModule,
    CoachApplicationRoutingModule,
    ReactiveFormsModule,

    SimpleRouterModule,
    SimpleMessageModule,
    SimpleLoaderModule,

    // Material Modules
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class CoachApplicationModule {
}
