import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './root.component';
import { CoachProfileRoutesEnum } from './coach-profile-routes.enum';
import { CoachProfileComponent } from './components/coach-profile/coach-profile.component';

const routes: Routes = [
  { path: '',
    component: RootComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: CoachProfileRoutesEnum.Root,
        component: CoachProfileComponent
      },
      {
        path: CoachProfileRoutesEnum.New,
        loadChildren: './modules/coach-application/coach-application.module#CoachApplicationModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachProfileRoutingModule { }
