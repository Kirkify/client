import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoachQuery } from '../../../../state/coach/coach.query';
import { RootRoutingQuery } from '../../../../state/root-routing/root-routing.query';
import { AuthenticationQuery } from '../../../../state/authentication/authentication.query';

@Component({
  selector: 'ch-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: [ './nav-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NavListComponent implements OnInit {

  isAuthenticated$ = this.authenticationQuery.selectIsAuthenticated$;
  isCoach$ = this.coachQuery.selectIsCoach$;
  coachRoute = this.rootRoutingQuery.getCoachRoute;
  searchRoute = this.rootRoutingQuery.getSearchRoute;
  messagingRoute = this.rootRoutingQuery.getMessagingRoute;
  dashboardRoute = this.rootRoutingQuery.getDashboardRoute;

  constructor(
    private authenticationQuery: AuthenticationQuery,
    private coachQuery: CoachQuery,
    private rootRoutingQuery: RootRoutingQuery
  ) { }

  ngOnInit(): void {
  }

}
