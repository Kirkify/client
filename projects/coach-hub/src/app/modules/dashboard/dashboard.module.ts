import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InterestedInModule } from './modules/interested-in/interested-in.module';
import { SimpleLoaderModule } from '../../shared/modules/simple-loader/simple-loader.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    SimpleLoaderModule,

    InterestedInModule,
    MatButtonModule
  ]
})
export class DashboardModule { }
