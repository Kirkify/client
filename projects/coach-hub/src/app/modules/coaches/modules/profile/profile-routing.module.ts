import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleRouterComponent } from '../../../../shared/modules/simple-router/simple-router.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: SimpleRouterComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
