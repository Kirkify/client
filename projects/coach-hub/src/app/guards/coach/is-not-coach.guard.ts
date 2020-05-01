import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IsCoachGuard } from './is-coach.guard';
import { map, take, tap } from 'rxjs/operators';
import { CoachQuery } from '../../state/coach/coach.query';
import { RootRoutingQuery } from '../../state/root-routing/root-routing.query';

@Injectable({
  providedIn: 'root'
})
export class IsNotCoachGuard implements CanActivate, CanLoad {
  private _isCoach$ = this.coachQuery.selectIsCoach$.pipe(
    take(1)
  );

  constructor(
    private coachQuery: CoachQuery,
    private rootRoutingQuery: RootRoutingQuery,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._isCoach$.pipe(
      tap(isCoach => this._handleResult(isCoach)),
      map(isCoach => !isCoach)
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> {
    return this._isCoach$.pipe(
      tap(isCoach => this._handleResult(isCoach)),
      map(isCoach => !isCoach)
    );
  }

  private _handleResult(isCoach: boolean) {
    if (isCoach) {
      this.router.navigate([ this.rootRoutingQuery.getCoachRoute ]);
    }
  }
}
