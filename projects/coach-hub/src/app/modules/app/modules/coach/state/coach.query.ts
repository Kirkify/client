import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { CoachState, CoachStore } from './coach.store';
import { map, mergeMap } from 'rxjs/operators';
import { SportsQuery } from '../../../state/sports/sports.query';

@Injectable({ providedIn: 'root' })
export class CoachQuery extends Query<CoachState> {

  constructor(
    protected store: CoachStore,
    private sportsQuery: SportsQuery
  ) {
    super(store);
  }

  selectApprovedSports() {
    return this.select(store => store.profiles).pipe(
      mergeMap(profiles => {
        const sports = [];
        for (const profile of profiles) {
          sports.push(profile.sports);
        }
        return this.sportsQuery.selectMany(sports);
      })
    );
  }
}
