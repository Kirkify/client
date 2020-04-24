import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { RegistrationInterface } from '../models/registration.interface';
import { CrudStateInterface } from '../../../../../../../shared/modules/crud/models/crud-state.interface';
import { RegistrationsSortByEnum } from '../models/registrations-sort-by.enum';

export interface RegistrationsState extends EntityState<RegistrationInterface>, CrudStateInterface<RegistrationInterface> {
}

const initialState: RegistrationsState = {
  sortBy: RegistrationsSortByEnum.Name,
  sortByOrder: 'asc',
  fetched: false,
  isDeleting: false
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'registrations' })
export class RegistrationsStore extends EntityStore<RegistrationsState, RegistrationInterface> {
  constructor() {
    super(initialState);
  }
}
