import { Injectable } from '@angular/core';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from '../../../state/authentication/authentication.service';
import { throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpStore } from './sign-up.store';
import { SignUpInterface } from '../../../state/authentication/models/sign-up.interface';
import { AppRoutingQuery } from '../../../state/app-routing/app-routing.query';

@Injectable({ providedIn: 'root' })
export class SignUpService {

  constructor(
    private store: SignUpStore,
    private appRoutingQuery: AppRoutingQuery,
    private router: Router,
    private route: ActivatedRoute,
    private service: AuthenticationService) {
  }

  signUp(user: SignUpInterface) {
    this.store.setError('');
    this.store.setLoading(true);

    return this.service.signUp(user).pipe(
      finalize(() => this.store.setLoading(false)),
      catchError(err => {
        this.store.setError(err);
        return throwError(err);
      })
    );
  }

  verify(email: string, verificationToken: string) {
    this.store.setError('');
    this.store.setLoading(true);

    return this.service.verify(email, verificationToken).pipe(
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
}
