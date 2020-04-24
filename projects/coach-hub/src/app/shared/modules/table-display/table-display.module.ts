import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDisplayComponent } from './table-display.component';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { SimpleLoaderModule } from '../simple-loader/simple-loader.module';
import { CellDisplayComponent } from './components/cell-display/cell-display.component';
import { FiltersModule } from './modules/filters/filters.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    TableDisplayComponent,
    CellDisplayComponent,
  ],
  exports: [
    TableDisplayComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SimpleLoaderModule,
    FiltersModule,

    // Material Modules
    MatTableModule,
    MatTooltipModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,

    MatButtonModule,
    MatIconModule
  ]
})
export class TableDisplayModule { }
