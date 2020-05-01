import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleLoaderModule } from '../../../../shared/modules/simple-loader/simple-loader.module';
import { ProgramViewerComponent } from './components/program-viewer/program-viewer.component';
import { ProgramViewerRoutingModule } from './program-viewer-routing.module';
import { SimpleMessageModule } from '../../../../shared/modules/simple-message/simple-message.module';
import { ProgramPriceSelectorComponent } from './components/program-price-selector/program-price-selector.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SimpleRouterModule } from '../../../../shared/modules/simple-router/simple-router.module';

@NgModule({
  declarations: [
    ProgramViewerComponent,
    ProgramPriceSelectorComponent
  ],
  imports: [
    CommonModule,
    ProgramViewerRoutingModule,
    FormsModule,

    SimpleRouterModule,
    SimpleMessageModule,
    SimpleLoaderModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule
  ]
})
export class ProgramViewerModule {
}
