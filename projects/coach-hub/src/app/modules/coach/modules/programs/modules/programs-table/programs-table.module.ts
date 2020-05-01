import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsTableComponent } from './programs-table.component';
import { TableDisplayModule } from '../../../../../../shared/modules/table-display/table-display.module';

@NgModule({
  declarations: [
    ProgramsTableComponent
  ],
  exports: [
    ProgramsTableComponent
  ],
  imports: [
    CommonModule,
    TableDisplayModule
  ]
})
export class ProgramsTableModule {
}
