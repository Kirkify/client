import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { CoachHubRoutesEnum } from '../../coach-hub-routes.enum';
import { CoachBaseProfileInterface } from '../../models/coach-base-profile.interface';

export interface CoachHubState {
  hasInitialStateBeenFetched: boolean;
  rootRoute: string;
  coachBaseProfile: CoachBaseProfileInterface;
  coachRoute: string;
}

function createInitialState(): CoachHubState {
  return {
    hasInitialStateBeenFetched: false,
    rootRoute: '',
    coachBaseProfile: null,
    coachRoute: `/coach-hub/${CoachHubRoutesEnum.Coach}`
  };
}

export const COACH_HUB_STORE_NAME = 'coachHub';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: COACH_HUB_STORE_NAME })
export class CoachHubStore extends Store<CoachHubState> {
  constructor() {
    super(createInitialState());
  }
}
