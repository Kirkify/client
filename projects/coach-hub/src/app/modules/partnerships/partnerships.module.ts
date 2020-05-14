import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnershipsRoutingModule } from './partnerships-routing.module';
import { SimpleRouterModule } from '../../shared/modules/simple-router/simple-router.module';
import { SponsorshipComponent } from './components/sponsorship/sponsorship.component';
import { InvestorsComponent } from './components/investors/investors.component';
import { PartnershipsComponent } from './components/partnerships/partnerships.component';


@NgModule({
  declarations: [SponsorshipComponent, InvestorsComponent, PartnershipsComponent],
  imports: [
    CommonModule,
    PartnershipsRoutingModule,

    SimpleRouterModule
  ]
})
export class PartnershipsModule { }
