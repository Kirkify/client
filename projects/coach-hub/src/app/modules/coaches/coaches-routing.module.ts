import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './modules/profile/components/profile/profile.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { SimpleRouterComponent } from '../../shared/modules/simple-router/simple-router.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleRouterComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
      },
      { path: 'programs', component: ProgramsComponent },
      { path: 'programs/:id', component: ProgramsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachesRoutingModule { }
