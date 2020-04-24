import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { CoachProfileInterface } from '../../../../models/coach-profile.interface';

export interface CoachesState extends EntityState<CoachProfileInterface> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'coaches' })
export class CoachesStore extends EntityStore<CoachesState, CoachProfileInterface> {

  constructor() {
    super();
  }

}

