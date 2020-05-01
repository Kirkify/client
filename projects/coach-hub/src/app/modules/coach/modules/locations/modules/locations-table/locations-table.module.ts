import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsTableComponent } from './locations-table.component';
import { TableDisplayModule } from '../../../../../../shared/modules/table-display/table-display.module';

@NgModule({
  declarations: [
    LocationsTableComponent
  ],
  exports: [
    LocationsTableComponent
  ],
  imports: [
    CommonModule,
    TableDisplayModule
  ]
})
export class LocationsTableModule {
}
