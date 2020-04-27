import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootRoutesEnum } from './root-routes.enum';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { AuthenticatedGuard } from './guards/authenticated/authenticated.guard';
import { GuestGuard } from './guards/guest/guest.guard';


const routes: Routes = [
  {
    path: RootRoutesEnum.Landing,
    loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: RootRoutesEnum.Login,
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    canLoad: [ GuestGuard ],
    canActivate: [ GuestGuard ]
  },
  {
    path: RootRoutesEnum.SignUp,
    loadChildren: () => import('./modules/sign-up/sign-up.module').then(m => m.SignUpModule)
  },
  {
    path: RootRoutesEnum.ForgotPassword,
    loadChildren: () => import('./modules/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
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
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
