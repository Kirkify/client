import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './root.component';
import { TagsComponent } from './components/tags/tags.component';
import { CrudRoutesEnum } from '../../../../../../shared/modules/crud/crud-routes.enum';

const routes: Routes = [
  { path: '',
    component: RootComponent,
    pathMatch: 'prefix',
    canActivateChild: [],
    children: [
      { path: '', pathMatch: 'full', redirectTo: CrudRoutesEnum.Create },
      { path: CrudRoutesEnum.Create, component: TagsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
