import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationQuery } from '../../state/authentication/authentication.query';
import { map, take } from 'rxjs/operators';
import { RootRoutesEnum } from '../../root-routes.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate, CanLoad {

  constructor(
    private query: AuthenticationQuery,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication(state.url);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthentication(route.path);
  }

  private checkAuthentication(url: string): Observable<boolean> | Promise<boolean> | boolean {
    console.log(url);
    return this.query.selectIsAuthenticated$
      .pipe(
        take(1),
        map(isAuthenticated => {
          if (isAuthenticated) {
            return true;
          } else {
            // TODO: Query params are currently not being saved should probably add logic for that
            // const pathName = location.pathname;
            // this.authService.redirectUrl = pathName.startsWith(url) ? pathName : pathName + url;
            this.router.navigate([ RootRoutesEnum.Login ]);
            // this is executed on a 401 or on any error
            return false;
          }
        })
      );
  }
}
