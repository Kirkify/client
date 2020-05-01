import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { MainComponent } from './components/main/main.component';
import { CrudRoutesEnum } from '../../../../shared/modules/crud/crud-routes.enum';
import { ViewComponent } from './components/view/view.component';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate/can-deactivate-guard.service';
import { SimpleRouterComponent } from '../../../../shared/modules/simple-router/simple-router.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleRouterComponent,
    pathMatch: 'prefix',
    children: [
      { path: CrudRoutesEnum.Main, pathMatch: 'full', component: MainComponent },
      {
        path: CrudRoutesEnum.Create,
        component: CreateComponent,
        canDeactivate: [ CanDeactivateGuard ]
      },
      {
        path: `:id`,
        component: ViewComponent
      },
      {
        path: `:id/${ CrudRoutesEnum.Edit }`,
        component: EditComponent,
        canDeactivate: [ CanDeactivateGuard ]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RegistrationsRoutingModule {
}
