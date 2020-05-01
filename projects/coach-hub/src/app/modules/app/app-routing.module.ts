import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { AppComponent } from './app.component';
import { CoachHubRoutesEnum } from './coach-hub-routes.enum';
// import { RootRouteInterface } from '../../shared/models/root-route.interface';
import { AuthenticatedGuard } from '../../guards/authenticated/authenticated.guard';
import { RootRouteInterface } from '../../models/root-route.interface';
import { IsCoachGuard } from '../../guards/coach/is-coach.guard';


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
      },
      {
        path: CoachHubRoutesEnum.Coach,
        canActivate: [ AuthenticatedGuard, IsCoachGuard ],
        loadChildren: () => import('../coach/coach.module').then(m => m.CoachModule),
        data: {
          routeRoute: CoachHubRoutesEnum.Coach
        } as RootRouteInterface
      },
      {
        path: CoachHubRoutesEnum.Athlete,
        canActivate: [ AuthenticatedGuard ],
        loadChildren: () => import('./modules/athlete/athlete.module').then(m => m.AthleteModule),
      },
      {
        matcher: (url) => {
          if (url.length > 0 && url[ 0 ].path.match(/^@[\w]+$/gm)) {
            return {
              consumed: [ url[ 0 ] ],
              posParams: {
                username: new UrlSegment(url[ 0 ].path.substr(1), {})
              }
            };
          }

          return null;
        },
        loadChildren: () => import('../coaches/coaches.module').then(m => m.CoachesModule)
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
