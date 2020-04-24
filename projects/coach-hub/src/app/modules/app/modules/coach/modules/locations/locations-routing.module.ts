import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './root.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { CrudRoutesEnum } from '../../../../../../shared/modules/crud/crud-routes.enum';
import { MainComponent } from './components/main/main.component';
import { ViewComponent } from './components/view/view.component';
import { CanDeactivateGuard } from '../../../../../../guards/can-deactivate/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
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
export class LocationsRoutingModule {
}
