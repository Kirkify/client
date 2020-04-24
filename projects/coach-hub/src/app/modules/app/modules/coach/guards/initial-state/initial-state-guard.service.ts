import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map, mergeMap, take } from 'rxjs/operators';
import { CoachStore } from '../../state/coach.store';
import { CoachQuery } from '../../state/coach.query';
import { CoachService } from '../../services/coach.service';
import { UiService } from '../../../../../../state/ui/ui.service';
import { RootRouteInterface } from '../../../../../../models/root-route.interface';

@Injectable({
  providedIn: 'root'
})
export class InitialStateGuardService implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
    private uiService: UiService,
    private store: CoachStore,
    private service: CoachService,
    private query: CoachQuery,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const data = next.data as RootRouteInterface;

    if (data.routeRoute) {
      this.store.update({
        rootRoute: data.routeRoute
      });
    }

    return this.fetchInitialState(state.url);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.fetchInitialState();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.fetchInitialState();
  }

  fetchInitialState(url = ''): Observable<boolean> | Promise<boolean> | boolean {
    return this.query.select(state => state.hasInitialStateBeenFetched).pipe(
      take(1),
      mergeMap(alreadyLoaded => {
        if (alreadyLoaded) {
          return of(true);
        } else {
          this.uiService.updateProgressBarStatus(true);
          return this.service.getInitialState().pipe(
            map(() => true),
            catchError(err => {
              console.log(err);
              // TODO: Alert user of an error
              return of(false);
            }),
            finalize(() => this.uiService.updateProgressBarStatus(false))
          );
        }
      })
    );
  }
}
