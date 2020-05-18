import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RootRoutesEnum } from '../../../../root-routes.enum';
import { RootRoutingQuery } from '../../../../state/root-routing/root-routing.query';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'ch-landing',
  templateUrl: './landing.component.html',
  styleUrls: [ './landing.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {
  appName = environment.app_name;
  routes = RootRoutesEnum;

  constructor(
    public rootRoutingQuery: RootRoutingQuery
  ) {
  }

  ngOnInit(): void {
  }

}
