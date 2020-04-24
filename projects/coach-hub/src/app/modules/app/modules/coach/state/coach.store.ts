import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { CoachProfileInterface } from '../../../models/coach-profile.interface';

export interface CoachState {
  rootRoute: string;
  hasInitialStateBeenFetched: boolean;
  profiles: CoachProfileInterface[];
}

function createInitialState(): CoachState {
  return {
    rootRoute: '',
    hasInitialStateBeenFetched: false,
    profiles: []
  };
}

export const COACH_STORE_NAME = 'coach';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: COACH_STORE_NAME })
export class CoachStore extends Store<CoachState> {
  constructor() {
    super(createInitialState());
  }
}
