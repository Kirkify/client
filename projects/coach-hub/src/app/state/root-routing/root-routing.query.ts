import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { RootRoutingStore, AppRoutingState } from './root-routing.store';
import { map, take } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { CoachQuery } from '../coach/coach.query';

@Injectable({ providedIn: 'root' })
export class RootRoutingQuery extends Query<AppRoutingState> {

  constructor(
    protected store: RootRoutingStore,
    private coachQuery: CoachQuery
  ) {
    super(store);
  }

  getSignUpRoute = this.getValue().signUpRoute;
  getLoginRoute = this.getValue().loginRoute;
  getMessagingRoute = this.getValue().messagingRoute;
  getDefaultRoute = this.getValue().defaultRoute;
  getCoachSignUpRoute = this.getValue().coachSignUpRoute;
  getCoachRoute = this.getValue().coachRoute;
  getSearchRoute = this.getValue().searchRoute;

  selectDefaultRouteOnce$ = this.coachQuery.selectIsCoach$.pipe(
    take(1),
    map(( isCoach) => isCoach ? this.getCoachRoute : this.getDefaultRoute)
  );

  selectForgotPasswordRoute$ = this.select(store => store.forgotPasswordRoute);
}
