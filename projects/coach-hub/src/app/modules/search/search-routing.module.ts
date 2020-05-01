import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { SearchRoutesEnum } from './search-routes.enum';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', pathMatch: 'full', redirectTo: SearchRoutesEnum.Programs },
      {
        path: SearchRoutesEnum.Programs,
        loadChildren: () => import('./modules/programs/programs.module').then(m => m.ProgramsModule),
      },
      {
        path: SearchRoutesEnum.Coaches,
        loadChildren: () => import('./modules/coaches/coaches.module').then(m => m.CoachesModule),
      },
      // {
      //   path: 'programs/:id',
      //   loadChildren: () => import('../app/modules/program-viewer/program-viewer.module').then(m => m.ProgramViewerModule),
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
