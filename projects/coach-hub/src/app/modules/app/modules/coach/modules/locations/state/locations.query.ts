import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { LocationInterface } from '../models/location.interface';
import { LocationsState, LocationsStore } from './locations.store';

@Injectable({ providedIn: 'root' })
export class LocationsQuery extends QueryEntity<LocationsState, LocationInterface> {
  constructor(protected store: LocationsStore) {
    super(store);
  }
}
