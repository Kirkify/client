import { Injectable } from '@angular/core';
import { ResetPasswordStore } from './reset-password.store';
import { AuthenticationService } from '../../../state/authentication/authentication.service';
import { ResetPasswordInterface } from '../../forgot-password/models/reset-password.interface';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { EMPTY, throwError } from 'rxjs';
import { RootRoutingQuery } from '../../../state/root-routing/root-routing.query';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ResetPasswordService {

  constructor(private store: ResetPasswordStore,
              private router: Router,
              private appRoutingQuery: RootRoutingQuery,
              private service: AuthenticationService) {
  }

  validateResetToken(credentials: ResetPasswordInterface) {
    this.store.setLoading(true);

    return this.service.resetPassword(credentials).pipe(
      finalize(() => this.store.setLoading(false)),
      catchError(err => {
        this.store.setError(err);
        return throwError(err);
      }),
      switchMap(() => this.appRoutingQuery.selectDefaultRouteOnce$.pipe(
        tap(route => this.router.navigate([ route ]))
      ))
    );
  }

  raiseRoutingError() {
    this.store.setError(
      'You must follow the address from the Forgot Password Email sent to you.'
    );
  }
}
