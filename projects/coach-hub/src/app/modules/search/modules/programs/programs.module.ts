import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { SimpleLoaderModule } from '../../../../shared/modules/simple-loader/simple-loader.module';
import { SimpleMessageModule } from '../../../../shared/modules/simple-message/simple-message.module';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProgramListComponent } from './components/program-list/program-list.component';
import { ProgramDisplayerComponent } from './components/program-displayer/program-displayer.component';
import { PriceDisplayerComponent } from './components/program-displayer/components/price-displayer/price-displayer.component';
import { TimeDisplayModule } from '../../../../shared/pipes/time-display/time-display.module';
import { SimpleRouterModule } from '../../../../shared/modules/simple-router/simple-router.module';


@NgModule({
  declarations: [
    ProgramListComponent,
    ProgramDisplayerComponent,
    PriceDisplayerComponent
  ],
  exports: [
    ProgramListComponent
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule,

    SimpleRouterModule,
    SimpleLoaderModule,
    SimpleMessageModule,
    TimeDisplayModule,

    MatListModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ProgramsModule {
}
