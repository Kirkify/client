import { Injectable, OnDestroy } from '@angular/core';
import { LoginStore } from './login.store';
import { catchError, finalize, switchMap, take, tap } from 'rxjs/operators';
import { LoginInterface } from '../../../../state/authentication/models/login.interface';
import { AuthenticationService } from '../../../../state/authentication/authentication.service';
import { BehaviorSubject, combineLatest, of, Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RootRoutingQuery } from '../../../../state/root-routing/root-routing.query';
import { QueryParamsEnum } from '../../../../models/query-params.enum';

@Injectable({ providedIn: 'any' })
export class LoginService implements OnDestroy {

  private redirectToSubject = new BehaviorSubject<string>('');
  private _subscriptions = new Subscription();

  constructor(
    private loginStore: LoginStore,
    private appRoutingQuery: RootRoutingQuery,
    private router: Router,
    private route: ActivatedRoute,
    private service: AuthenticationService) {

    this._subscriptions.add(
      this.route.queryParamMap.pipe(
        tap(params => {
          if (params.has(QueryParamsEnum.RedirectTo)) {
            this.redirectToSubject.next(params.get(QueryParamsEnum.RedirectTo));
          }
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    console.log('DESTROYING');
    this._subscriptions.unsubscribe();
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
      switchMap(() => combineLatest([
        this.redirectToSubject.asObservable().pipe(take(1)),
        this.appRoutingQuery.selectDefaultRouteOnce$
      ]).pipe(
        tap( ([redirectTo, defaultRoute ]) => {
          if (redirectTo) {
            this.router.navigateByUrl(redirectTo);
          } else {
            this.router.navigate([ defaultRoute ]);
          }
        })
      )
    ));
  }
}
