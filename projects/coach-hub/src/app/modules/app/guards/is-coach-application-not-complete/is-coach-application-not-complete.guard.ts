import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CoachHubQuery } from '../../state/coach-hub/coach-hub.query';
import { CoachHubRoutesEnum } from '../../coach-hub-routes.enum';

@Injectable({
  providedIn: 'root'
})
export class IsCoachApplicationNotCompleteGuard implements CanActivate {
  constructor(
    private router: Router,
    private query: CoachHubQuery,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._isCoachApplicationNotComplete();
  }

  private _isCoachApplicationNotComplete(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.query.selectIsCoach().pipe(
      take(1),
      map(coach => {
        if (!coach) {
          return true;
        } else {
          const rootRoute = this.query.getValue().rootRoute;
          const urlTree = this.router.parseUrl(`${ rootRoute }/${ CoachHubRoutesEnum.Coach }`);
          return urlTree;
        }
      })
    );
  }
}
