import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { UserInterface } from '../../../../state/authentication/models/user.interface';

export interface UsersState extends EntityState<Partial<UserInterface>> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class UsersStore extends EntityStore<UsersState, Partial<UserInterface>> {
  constructor() {
    super();
  }
}
