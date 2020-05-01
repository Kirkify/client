import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationsTableComponent } from './registrations-table.component';
import { TableDisplayModule } from '../../../../../../shared/modules/table-display/table-display.module';

@NgModule({
  declarations: [
    RegistrationsTableComponent
  ],
  exports: [
    RegistrationsTableComponent
  ],
  imports: [
    CommonModule,
    TableDisplayModule
  ]
})
export class RegistrationsTableModule {
}
