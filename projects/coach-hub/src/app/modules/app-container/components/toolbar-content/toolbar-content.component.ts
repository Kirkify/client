import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationQuery } from '../../../../state/authentication/authentication.query';
import { AuthenticationService } from '../../../../state/authentication/authentication.service';
import { RootRoutesEnum } from '../../../../root-routes.enum';
import { RootRoutingQuery } from '../../../../state/root-routing/root-routing.query';
import { CoachQuery } from '../../../../state/coach/coach.query';

@Component({
  selector: 'ch-toolbar-content',
  templateUrl: './toolbar-content.component.html',
  styleUrls: [ './toolbar-content.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarContentComponent {

  isAuthenticated$ = this.query.selectIsAuthenticated$;
  firstName$ = this.query.selectUserFirstName$;
  isLoggingOut$ = this.query.selectIsLoggingOut$;
  isCoach$ = this.coachQuery.selectIsCoach$;

  unreadCount = 0;
  constructor(
    public rootRoutingQuery: RootRoutingQuery,
    private query: AuthenticationQuery,
    private service: AuthenticationService,
    private coachQuery: CoachQuery
  ) {
  }

  logout() {
    this.service.logout();
  }

}
