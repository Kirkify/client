import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AthleteRoutingModule } from './athlete-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RootComponent } from './components/root/root.component';
import { DrawerContainerModule } from '../../../../shared/modules/drawer-container/drawer-container.module';

@NgModule({
  declarations: [
    DashboardComponent,
    RootComponent
  ],
  imports: [
    CommonModule,
    AthleteRoutingModule,
    DrawerContainerModule
  ]
})
export class AthleteModule {
}
