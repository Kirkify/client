import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CoachRoutingModule } from './coach-routing.module';
import { RootComponent } from './components/root/root.component';
import { DrawerContainerModule } from '../../shared/modules/drawer-container/drawer-container.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DashboardComponent,
    RootComponent
  ],
  imports: [
    CommonModule,
    CoachRoutingModule,
    DrawerContainerModule
  ]
})
export class CoachModule { }
