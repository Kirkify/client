import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleRouterComponent } from '../../shared/modules/simple-router/simple-router.component';
import { PartnershipsComponent } from './components/partnerships/partnerships.component';
import { SponsorshipComponent } from './components/sponsorship/sponsorship.component';
import { InvestorsComponent } from './components/investors/investors.component';
import { PartnershipsRoutesEnum } from './partnerships-routes.enum';


const routes: Routes = [
  {
    path: '',
    component: SimpleRouterComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PartnershipsComponent
      },
      {
        path: PartnershipsRoutesEnum.Sponsorship,
        component: SponsorshipComponent
      },
      {
        path: PartnershipsRoutesEnum.Investors,
        component: InvestorsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnershipsRoutingModule { }
