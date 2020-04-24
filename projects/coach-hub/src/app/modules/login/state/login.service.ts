import { Injectable } from '@angular/core';
import { LoginStore } from './login.store';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { LoginInterface } from '../../../state/authentication/models/login.interface';
import { AuthenticationService } from '../../../state/authentication/authentication.service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RootRoutingQuery } from '../../../state/root-routing/root-routing.query';

@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor(
    private loginStore: LoginStore,
    private appRoutingQuery: RootRoutingQuery,
    private router: Router,
    private service: AuthenticationService) {
  }

  login(user: LoginInterface) {
    this.loginStore.setError('');
    this.loginStore.setLoading(true);

    return this.service.login(user).pipe(
      finalize(() => this.loginStore.setLoading(false)),
      catchError(err => {
        this.loginStore.setError(err);
        return throwError(err);
      }),
      switchMap(() => this.appRoutingQuery.selectDefaultRouteOnce$.pipe(
        tap(route => this.router.navigate([ route ]))
      ))
    );
  }
}
