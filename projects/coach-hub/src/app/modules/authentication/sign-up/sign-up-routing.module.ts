import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyComponent } from './components/verify/verify.component';
import { SignUpRoutesEnum } from './sign-up-routes.enum';

const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: SignUpRoutesEnum.VerifyEmail, component: VerifyComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SignUpRoutingModule {
}
