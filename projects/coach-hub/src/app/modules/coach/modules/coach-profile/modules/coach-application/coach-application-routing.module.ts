import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachApplicationComponent } from './components/coach-application/coach-application.component';
import { SimpleRouterComponent } from '../../../../../../shared/modules/simple-router/simple-router.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleRouterComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: '', pathMatch: 'full', component: CoachApplicationComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CoachApplicationRoutingModule {
}
