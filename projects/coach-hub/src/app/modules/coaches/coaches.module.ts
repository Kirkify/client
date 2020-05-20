import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachesRoutingModule } from './coaches-routing.module';
import { ProgramsComponent } from './components/programs/programs.component';
import { SimpleLoaderModule } from '../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../shared/modules/simple-message/simple-message.module';
import { SimpleRouterModule } from '../../shared/modules/simple-router/simple-router.module';

@NgModule({
  declarations: [
    ProgramsComponent
  ],
  imports: [
    CommonModule,
    CoachesRoutingModule,

    SimpleRouterModule,
    SimpleLoaderModule,
    SimpleMessageModule
  ]
})
export class CoachesModule {
}
