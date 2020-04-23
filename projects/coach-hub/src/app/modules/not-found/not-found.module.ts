import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  exports: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatIconModule
  ]
})
export class NotFoundModule { }
