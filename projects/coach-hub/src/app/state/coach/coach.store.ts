import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { CoachBaseProfileInterface } from '../../modules/app/models/coach-base-profile.interface';

export interface CoachState {
  fetched: boolean;
  baseProfile: CoachBaseProfileInterface;
}

export function createInitialState(): CoachState {
  return {
    fetched: false,
    baseProfile: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'coach' })
export class CoachStore extends Store<CoachState> {

  constructor() {
    super(createInitialState());
  }

  updateBaseProfile(baseProfile: CoachBaseProfileInterface) {
    this.update({ baseProfile });
  }
}

