import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { LocationInterface } from '../models/location.interface';
import { CrudStateInterface } from '../../../../../shared/modules/crud/models/crud-state.interface';

export interface LocationsState extends EntityState<LocationInterface>, CrudStateInterface<LocationInterface> {
}

const initialState: LocationsState = {
  fetched: false,
  isDeleting: false,
  formMsg: ''
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'locations' })
export class LocationsStore extends EntityStore<LocationsState, LocationInterface> {
  constructor() {
    super(initialState);
  }
}
