import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { RootComponent } from './root.component';
import { SimpleLoaderModule } from '../../shared/modules/simple-loader/simple-loader.module';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ProgramsModule } from './modules/programs/programs.module';
import { CoachesModule } from './modules/coaches/coaches.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    RootComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SimpleLoaderModule,
    SharedPipesModule,

    ProgramsModule,
    CoachesModule,

    MatTabsModule,
    MatIconModule,
  ]
})
export class SearchModule {
}
