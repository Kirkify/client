import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './root.component';
import { FormCreatorLandingComponent } from './components/form-creator-landing/form-creator-landing.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', pathMatch: 'full', component: FormCreatorLandingComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormCreatorLandingRoutingModule { }
