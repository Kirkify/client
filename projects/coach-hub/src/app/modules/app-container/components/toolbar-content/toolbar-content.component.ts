import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationQuery } from '../../../../state/authentication/authentication.query';
import { AuthenticationService } from '../../../../state/authentication/authentication.service';
import { RootRoutesEnum } from '../../../../root-routes.enum';
import { RootRoutingQuery } from '../../../../state/root-routing/root-routing.query';

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

  loginRoute = this.rootRoutingQuery.getLoginRoute;
  signUpRoute = this.rootRoutingQuery.getSignUpRoute;
  messagingRoute = this.rootRoutingQuery.getMessagingRoute;
  dashboardRoute = this.rootRoutingQuery.getDashboardRoute;
  settingsRoute = this.rootRoutingQuery.getSettingsRoute;
  unreadCount = 0;
  constructor(
    private query: AuthenticationQuery,
    private rootRoutingQuery: RootRoutingQuery,
    private service: AuthenticationService
  ) {
  }

  logout() {
    this.service.logout().subscribe();
  }

}
