import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RootRoutesEnum } from '../../../../../root-routes.enum';
import { AuthenticationQuery } from '../../../../../state/authentication/authentication.query';
import { AuthenticationService } from '../../../../../state/authentication/authentication.service';

@Component({
  selector: 'ch-navigation-shell',
  templateUrl: './navigation-shell.component.html',
  styleUrls: ['./navigation-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationShellComponent {

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
