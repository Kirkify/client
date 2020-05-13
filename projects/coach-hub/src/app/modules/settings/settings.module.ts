import { NgModule } from '@angular/core';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './components/settings/settings.component';
import { DrawerContainerModule } from '../../shared/modules/drawer-container/drawer-container.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    DrawerContainerModule
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule {
}
