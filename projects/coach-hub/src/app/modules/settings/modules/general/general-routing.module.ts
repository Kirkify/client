import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralListComponent } from './components/general-list/general-list.component';
import { GeneralRoutesEnum } from './general-routes.enum';
import { UserComponent } from './components/user/user.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EmailComponent } from './components/email/email.component';
import { CanDeactivateGuard } from '../../../../guards/can-deactivate/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    component: GeneralListComponent
  },
  {
    path: GeneralRoutesEnum.User,
    component: UserComponent,
    canDeactivate: [ CanDeactivateGuard ]
  },
  {
    path: GeneralRoutesEnum.UserProfile,
    component: UserProfileComponent,
    canDeactivate: [ CanDeactivateGuard ]
  },
  {
    path: GeneralRoutesEnum.Email,
    component: EmailComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GeneralRoutingModule {
}
