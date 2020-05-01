import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachProfileRoutesEnum } from './coach-profile-routes.enum';
import { CoachProfileComponent } from './components/coach-profile/coach-profile.component';
import { SimpleRouterComponent } from '../../../../shared/modules/simple-router/simple-router.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleRouterComponent,
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
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CoachProfileRoutingModule {
}
