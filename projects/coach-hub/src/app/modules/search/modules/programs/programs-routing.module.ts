import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramListComponent } from './components/program-list/program-list.component';


const routes: Routes = [
  {
    path: '',
    component: ProgramListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
