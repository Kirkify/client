import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';
import { IdentifyComponent } from './components/identify/identify.component';
import { ResetComponent } from './components/reset/reset.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', component: IdentifyComponent },
      { path: 'reset', component: ResetComponent }
    ]
  },
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ForgotPasswordRoutingModule {
}
