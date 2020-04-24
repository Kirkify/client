import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { CoachHubState, CoachHubStore } from './coach-hub.store';

@Injectable({ providedIn: 'root' })
export class CoachHubQuery extends Query<CoachHubState> {

  constructor(protected store: CoachHubStore) {
    super(store);
  }

  selectBaseProfile() {
    return this.select(store => store.coachBaseProfile);
  }

  selectCoachName() {
    return this.select(store => store.coachBaseProfile.name);
  }

  selectIsCoach() {
    return this.select(state => state.coachBaseProfile !== null);
  }

  getCoachRoute() {
    return this.getValue().coachRoute;
  }
}
