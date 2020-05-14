import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { LegalRoutesEnum } from './legal-routes.enum';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { SimpleRouterComponent } from '../../shared/modules/simple-router/simple-router.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: SimpleRouterComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: LegalRoutesEnum.TermsAndConditions
      },
      {
        path: LegalRoutesEnum.PrivacyPolicy,
        component: PrivacyPolicyComponent
      },
      {
        path: LegalRoutesEnum.TermsAndConditions,
        component: TermsAndConditionsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalRoutingModule { }
