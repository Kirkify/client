import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RootRoutesEnum } from '../../root-routes.enum';
import { AuthenticationService } from '../../state/authentication/authentication.service';
import { AuthenticationQuery } from '../../state/authentication/authentication.query';

@Component({
  selector: 'ch-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  routes = RootRoutesEnum;
  isAuthenticated$ = this.query.selectIsAuthenticated$;
  user$ = this.query.selectUser$;

  constructor(
    private query: AuthenticationQuery,
    private service: AuthenticationService
  ) {}

  logout() {
    this.service.logout().subscribe();
  }
}
