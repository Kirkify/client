import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleLoaderComponent } from './simple-loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    SimpleLoaderComponent,
  ],
  exports: [
    SimpleLoaderComponent
  ],
  imports: [
    CommonModule,

    // Material Modules
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SimpleLoaderModule { }
