import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './root.component';
import { ProgramViewerComponent } from './components/program-viewer/program-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', pathMatch: 'full', component: ProgramViewerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramViewerRoutingModule { }
