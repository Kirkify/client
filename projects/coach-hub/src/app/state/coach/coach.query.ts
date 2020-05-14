import { Injectable } from '@angular/core';
import { filterNil, Query } from '@datorama/akita';
import { CoachStore, CoachState } from './coach.store';
import { AuthenticationQuery } from '../authentication/authentication.query';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CoachQuery extends Query<CoachState> {

  constructor(
    protected store: CoachStore,
    private authenticationQuery: AuthenticationQuery
  ) {
    super(store);
  }

  fetched = this.getValue().fetched;

  selectBaseProfile$ = this.select(store => store.baseProfile);

  selectIsCoach$ = combineLatest([
    this.selectBaseProfile$,
    this.authenticationQuery.selectHasCoachRole$
  ]).pipe(
    map(([ baseProfile, hasCoachRole ]) => {
      return !!( baseProfile || hasCoachRole );
    })
  );

  selectCoachName$ = this.selectBaseProfile$.pipe(
    filterNil,
    map(profile => profile.name)
  );
}
