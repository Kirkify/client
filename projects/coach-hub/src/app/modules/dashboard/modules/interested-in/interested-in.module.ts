import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestedInComponent } from './components/interested-in/interested-in.component';
import { GroupDisplayerComponent } from './components/group-displayer/group-displayer.component';
import { MatChipsModule } from '@angular/material/chips';
import { CategoryDisplayComponent } from './components/category-display/category-display.component';
import { SimpleLoaderModule } from '../../../../shared/modules/simple-loader/simple-loader.module';
import { IsCategoryIdActivePipe } from './pipes/is-category-id-active.pipe';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    InterestedInComponent,
    GroupDisplayerComponent,
    CategoryDisplayComponent,
    IsCategoryIdActivePipe
  ],
  exports: [
    InterestedInComponent
  ],
  imports: [
    CommonModule,

    SimpleLoaderModule,

    MatChipsModule,
    MatButtonModule
  ]
})
export class InterestedInModule {
}
