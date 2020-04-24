import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { UserInterface } from '../../../../state/authentication/models/user.interface';

export interface FriendsState extends EntityState<Partial<UserInterface>> {
  loaded: boolean;
}

const initialState = {
  loaded: false
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'friends' })
export class FriendsStore extends EntityStore<FriendsState, Partial<UserInterface>> {
  constructor() {
    super(initialState);
  }
}
