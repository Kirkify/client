import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './root.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', pathMatch: 'full', component: SearchComponent },
      {
        path: 'programs/:id',
        loadChildren: () => import('../program-viewer/program-viewer.module').then(m => m.ProgramViewerModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
