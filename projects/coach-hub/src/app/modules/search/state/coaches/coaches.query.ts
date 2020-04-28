import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CoachesStore, CoachesState } from './coaches.store';
import { CoachProfileInterface } from '../../../app/models/coach-profile.interface';

@Injectable({
  providedIn: 'root'
})
export class CoachesQuery extends QueryEntity<CoachesState, CoachProfileInterface> {

  constructor(protected store: CoachesStore) {
    super(store);
  }

}
