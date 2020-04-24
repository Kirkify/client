import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { AthleteRoutesEnum } from './athlete-routes.enum';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', pathMatch: 'full', redirectTo: AthleteRoutesEnum.Search },
      { path: AthleteRoutesEnum.Dashboard, component: DashboardComponent },
      {
        path: AthleteRoutesEnum.Search,
        loadChildren: '../search/search.module#SearchModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AthleteRoutingModule {
}
