import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { AppComponent } from './app.component';
import { CoachHubRoutesEnum } from './coach-hub-routes.enum';
import { InitialStateGuardService } from './guards/initial-state/initial-state-guard.service';
import { IsCoachApplicationCompleteGuard } from './guards/is-coach-application-complete/is-coach-application-complete.guard';
import { IsCoachApplicationNotCompleteGuard } from './guards/is-coach-application-not-complete/is-coach-application-not-complete.guard';
// import { RootRouteInterface } from '../../shared/models/root-route.interface';
import { AuthenticatedGuard } from '../../guards/authenticated/authenticated.guard';
import { RootRouteInterface } from '../../models/root-route.interface';


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'prefix',
    canActivate: [ InitialStateGuardService ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
      },
      {
        path: CoachHubRoutesEnum.Coach,
        canActivate: [ AuthenticatedGuard, IsCoachApplicationCompleteGuard ],
        loadChildren: () => import('./modules/coach/coach.module').then(m => m.CoachModule),
        data: {
          routeRoute: CoachHubRoutesEnum.Coach
        } as RootRouteInterface
      },
      {
        path: CoachHubRoutesEnum.BecomeACoach,
        canActivate: [ AuthenticatedGuard, IsCoachApplicationNotCompleteGuard ],
        loadChildren: () => import('./modules/become-a-coach/become-a-coach.module').then(m => m.BecomeACoachModule)
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
        loadChildren: () => import('./modules/coaches/coaches.module').then(m => m.CoachesModule)
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
