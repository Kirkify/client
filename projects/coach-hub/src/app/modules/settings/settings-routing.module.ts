import { SettingsComponent } from './components/settings/settings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsRoutesEnum } from './settings-routes.enum';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', pathMatch: 'full', redirectTo: SettingsRoutesEnum.General },
      {
        path: SettingsRoutesEnum.General,
        loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule),
      },
      {
        path: SettingsRoutesEnum.Security,
        loadChildren: () => import('./modules/security/security.module').then(m => m.SecurityModule),
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SettingsRoutingModule {
}
