import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { RootRoutesEnum } from './root-routes.enum';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { AuthenticatedGuard } from './guards/authenticated/authenticated.guard';
import { GuestGuard } from './guards/guest/guest.guard';
import { IsNotCoachGuard } from './guards/coach/is-not-coach.guard';
import { CoachHubRoutesEnum } from './modules/app/coach-hub-routes.enum';
import { IsCoachGuard } from './guards/coach/is-coach.guard';
import { RootRouteInterface } from './models/root-route.interface';


const routes: Routes = [
  // HOME PAGE ROUTE
  {
    path: RootRoutesEnum.Landing,
    loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
  },
  // AUTHENTICATION ROUTES
  {
    path: RootRoutesEnum.Login,
    loadChildren: () => import('./modules/authentication/login/login.module').then(m => m.LoginModule),
    canLoad: [ GuestGuard ],
    canActivate: [ GuestGuard ]
  },
  {
    path: RootRoutesEnum.SignUp,
    loadChildren: () => import('./modules/authentication/sign-up/sign-up.module').then(m => m.SignUpModule)
  },
  {
    path: RootRoutesEnum.ForgotPassword,
    loadChildren: () => import('./modules/authentication/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  // APPLICATION ROUTES
  {
    path: RootRoutesEnum.Search,
    loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule)
  },
  {
    path: RootRoutesEnum.CoachSignUp,
    loadChildren: () => import('./modules/become-a-coach/become-a-coach.module').then(m => m.BecomeACoachModule),
    canLoad: [ AuthenticatedGuard, IsNotCoachGuard ],
    canActivate: [ AuthenticatedGuard, IsNotCoachGuard ]
  },
  {
    path: RootRoutesEnum.Coach,
    canActivate: [ AuthenticatedGuard, IsCoachGuard ],
    loadChildren: () => import('./modules/coach/coach.module').then(m => m.CoachModule),
  },
  {
    path: RootRoutesEnum.App,
    loadChildren: () => import('./modules/app/app.module').then(m => m.AppModule),
    canLoad: [ AuthenticatedGuard ],
    canActivate: [ AuthenticatedGuard ]
  },
  {
    path: RootRoutesEnum.Messaging,
    loadChildren: () => import('./modules/messaging/messaging.module').then(m => m.MessagingModule),
    canLoad: [ AuthenticatedGuard ],
    canActivate: [ AuthenticatedGuard ]
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
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
