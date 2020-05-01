import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachApplicationDisplayerComponent } from './coach-application-displayer.component';
import { RouterModule } from '@angular/router';
import { CoachApplicationModule } from '../coach-application/coach-application.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    CoachApplicationDisplayerComponent
  ],
  exports: [
    CoachApplicationDisplayerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoachApplicationModule,

    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule
  ]
})
export class CoachApplicationDisplayerModule { }
