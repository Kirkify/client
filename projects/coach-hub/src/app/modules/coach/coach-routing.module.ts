import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoachRoutesEnum } from './coach-routes.enum';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RootComponent } from './components/root/root.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: CoachRoutesEnum.Dashboard
      },
      {
        path: CoachRoutesEnum.Dashboard,
        component: DashboardComponent
      },
      {
        path: CoachRoutesEnum.Profile,
        loadChildren: () => import('./modules/coach-profile/coach-profile.module').then(m => m.CoachProfileModule),
      },
      {
        path: CoachRoutesEnum.Programs,
        loadChildren: () => import('./modules/programs/programs.module').then(m => m.ProgramsModule),
      },
      {
        path: CoachRoutesEnum.Locations,
        loadChildren: () => import('./modules/locations/locations.module').then(m => m.LocationsModule),
      },
      {
        path: CoachRoutesEnum.Tags,
        loadChildren: () => import('./modules/tags/tags.module').then(m => m.TagsModule),
      },
      {
        path: CoachRoutesEnum.Registrations,
        loadChildren: () => import('./modules/registrations/registrations.module').then(m => m.RegistrationsModule),
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CoachRoutingModule {
}
