import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { RootComponent } from './root.component';
import { CoachCardComponent } from './components/coach-card/coach-card.component';
import { ProgramListComponent } from './components/program-list/program-list.component';
import { ProgramDisplayerComponent } from './components/program-displayer/program-displayer.component';
import { CoachListComponent } from './components/coach-list/coach-list.component';
import { SimpleLoaderModule } from '../../../../shared/modules/simple-loader/simple-loader.module';
import { SharedPipesModule } from '../../../../shared/pipes/shared-pipes.module';
import { PriceDisplayerComponent } from './components/program-displayer/components/price-displayer/price-displayer.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    RootComponent,
    SearchComponent,
    CoachCardComponent,
    ProgramListComponent,
    ProgramDisplayerComponent,
    CoachListComponent,
    PriceDisplayerComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SimpleLoaderModule,
    SharedPipesModule,

    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatCardModule
  ]
})
export class SearchModule { }
