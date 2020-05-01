import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RootRoutingQuery } from '../../../../../state/root-routing/root-routing.query';

@Component({
  selector: 'ch-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  signUpRoute = this.query.getSignUpRoute;

  constructor(
    private query: RootRoutingQuery
  ) {
  }

}
