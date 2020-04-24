import { NgModule } from '@angular/core';
import { TagsComponent } from './components/tags/tags.component';
import { TagsRoutingModule } from './tags-routing.module';
import { RootComponent } from './root.component';
import { TagsTableComponent } from './components/tags-table/tags-table.component';
import { CdkTableModule } from '@angular/cdk/table';
import { TagAutoCompleteComponent } from './components/tag-auto-complete/tag-auto-complete.component';
import { AutocompleteChipsModule } from '../../../../../../shared/modules/autocomplete-chips/autocomplete-chips.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    TagsComponent,
    RootComponent,
    TagsTableComponent,
    TagAutoCompleteComponent
  ],
  exports: [
    TagAutoCompleteComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    AutocompleteChipsModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule
  ]
})
export class TagsModule { }
