import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutesEnum } from './app-routes.enum';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { AuthenticatedGuard } from './guards/authenticated/authenticated.guard';


const routes: Routes = [
  {
    path: AppRoutesEnum.Landing,
    loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: AppRoutesEnum.Login,
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: AppRoutesEnum.SignUp,
    loadChildren: () => import('./modules/sign-up/sign-up.module').then(m => m.SignUpModule)
  },
  {
    path: AppRoutesEnum.ForgotPassword,
    loadChildren: () => import('./modules/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: AppRoutesEnum.Dashboard,
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [ AuthenticatedGuard ],
    canActivate: [ AuthenticatedGuard ]
  },
  {
    path: AppRoutesEnum.Messaging,
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
export class AppRoutingModule { }
