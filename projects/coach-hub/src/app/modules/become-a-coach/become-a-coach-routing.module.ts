import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BecomeACoachComponent } from './components/become-a-coach/become-a-coach.component';
import { SimpleRouterComponent } from '../../shared/modules/simple-router/simple-router.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleRouterComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: '', pathMatch: 'full', component: BecomeACoachComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BecomeACoachRoutingModule { }
