import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormCreatorComponent } from './form-creator.component';
import { FormCreatorContainerComponent } from './components/form-creator-container/form-creator-container.component';

const routes: Routes = [
  {
    path: '',
    component: FormCreatorComponent,
    pathMatch: 'prefix',
    children: [
      { path: '',
        pathMatch: 'full',
        loadChildren: './modules/form-creator-landing/form-creator-landing.module#FormCreatorLandingModule',
      },
      {
        path: 'edit/:uuid',
        component: FormCreatorContainerComponent
      }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class FormCreatorRoutingModule {
}
