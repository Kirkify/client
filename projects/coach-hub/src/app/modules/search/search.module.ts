import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { SimpleLoaderModule } from '../../shared/modules/simple-loader/simple-loader.module';
import { MatIconModule } from '@angular/material/icon';
import { ProgramsModule } from './modules/programs/programs.module';
import { CoachesModule } from './modules/coaches/coaches.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SimpleLoaderModule,

    ProgramsModule,
    CoachesModule,

    MatTabsModule,
    MatIconModule,
  ]
})
export class SearchModule {
}
