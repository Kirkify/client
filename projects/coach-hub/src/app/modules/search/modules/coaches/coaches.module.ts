import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachesRoutingModule } from './coaches-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CoachCardComponent } from './components/coach-card/coach-card.component';
import { CoachListComponent } from './components/coach-list/coach-list.component';


@NgModule({
  declarations: [
    CoachCardComponent,
    CoachListComponent,
  ],
  exports: [
    CoachListComponent
  ],
  imports: [
    CommonModule,
    CoachesRoutingModule,

    MatListModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class CoachesModule { }
