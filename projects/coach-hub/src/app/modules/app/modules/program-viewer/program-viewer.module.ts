import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root.component';
import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatIconModule, MatListModule } from '@angular/material';
import { SimpleLoaderModule } from '../../../../shared/modules/simple-loader/simple-loader.module';
import { SharedPipesModule } from '../../../../shared/pipes/shared-pipes.module';
import { ProgramViewerComponent } from './components/program-viewer/program-viewer.component';
import { ProgramViewerRoutingModule } from './program-viewer-routing.module';
import { SimpleMessageModule } from '../../../../shared/modules/simple-message/simple-message.module';
import { ProgramPriceSelectorComponent } from './components/program-price-selector/program-price-selector.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RootComponent,
    ProgramViewerComponent,
    ProgramPriceSelectorComponent
  ],
  imports: [
    CommonModule,
    ProgramViewerRoutingModule,
    SimpleMessageModule,
    SimpleLoaderModule,
    SharedPipesModule,
    FormsModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule
  ]
})
export class ProgramViewerModule { }
