import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad, Route, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, map, mergeMap } from 'rxjs/operators';
import { TokenQuery } from '../../state/token/token.query';
import { RootRoutingQuery } from '../../state/root-routing/root-routing.query';

// We only want unauthenticated users to be able to route to these pages
@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private query: TokenQuery,
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
