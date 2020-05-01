import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramListComponent } from './components/program-list/program-list.component';
import { ProgramDisplayerComponent } from './components/program-displayer/program-displayer.component';
import { SimpleRouterComponent } from '../../../../shared/modules/simple-router/simple-router.component';


const routes: Routes = [
  {
    path: '',
    component: SimpleRouterComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProgramListComponent
      },
      {
        path: ':id',
        component: ProgramDisplayerComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProgramsRoutingModule {
}
