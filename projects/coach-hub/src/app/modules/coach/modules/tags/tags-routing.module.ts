import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsComponent } from './components/tags/tags.component';
import { CrudRoutesEnum } from '../../../../shared/modules/crud/crud-routes.enum';
import { SimpleRouterComponent } from '../../../../shared/modules/simple-router/simple-router.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleRouterComponent,
    pathMatch: 'prefix',
    canActivateChild: [],
    children: [
      { path: '', pathMatch: 'full', redirectTo: CrudRoutesEnum.Create },
      { path: CrudRoutesEnum.Create, component: TagsComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TagsRoutingModule {
}
