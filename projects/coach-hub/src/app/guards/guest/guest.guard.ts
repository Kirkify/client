import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { RootRoutingQuery } from '../../state/root-routing/root-routing.query';
import { AuthenticationQuery } from '../../state/authentication/authentication.query';

// We only want unauthenticated users to be able to route to these pages
@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private query: AuthenticationQuery,
    private rootRoutingQuery: RootRoutingQuery,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthentication();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthentication();
  }

  checkAuthentication(): Observable<boolean> | Promise<boolean> | boolean {
    return this.query.selectIsAuthenticated$
      .pipe(
        take(1),
        mergeMap(isAuthenticated => {
          if (!isAuthenticated) {
            return of(true);
          } else {
            return this.rootRoutingQuery.selectDefaultRouteOnce$.pipe(
              map(route => {
                this.router.navigate([ route ]);
                return false;
              })
            );
          }
        })
      );
  }
}
