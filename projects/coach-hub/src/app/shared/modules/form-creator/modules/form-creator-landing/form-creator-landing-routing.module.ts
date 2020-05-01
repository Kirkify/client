import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCreatorLandingComponent } from './components/form-creator-landing/form-creator-landing.component';
import { SimpleRouterComponent } from '../../../simple-router/simple-router.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleRouterComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', pathMatch: 'full', component: FormCreatorLandingComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class FormCreatorLandingRoutingModule {
}
