import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalRoutingModule } from './legal-routing.module';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SimpleRouterModule } from '../../shared/modules/simple-router/simple-router.module';


@NgModule({
  declarations: [TermsAndConditionsComponent, PrivacyPolicyComponent],
  imports: [
    CommonModule,
    LegalRoutingModule,

    SimpleRouterModule
  ]
})
export class LegalModule { }
