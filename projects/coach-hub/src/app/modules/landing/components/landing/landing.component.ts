import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RootRoutesEnum } from '../../../../root-routes.enum';
import { RootRoutingQuery } from '../../../../state/root-routing/root-routing.query';

@Component({
  selector: 'ch-landing',
  templateUrl: './landing.component.html',
  styleUrls: [ './landing.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {

  routes = RootRoutesEnum;

  constructor(
    public rootRoutingQuery: RootRoutingQuery
  ) {
  }

  ngOnInit(): void {
  }

}
