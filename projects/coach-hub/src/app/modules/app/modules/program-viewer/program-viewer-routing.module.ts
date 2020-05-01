import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramViewerComponent } from './components/program-viewer/program-viewer.component';
import { SimpleRouterComponent } from '../../../../shared/modules/simple-router/simple-router.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleRouterComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', pathMatch: 'full', component: ProgramViewerComponent },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProgramViewerRoutingModule {
}
