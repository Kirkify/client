import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { UserProfileInterface } from './models/user-profile.interface';

export interface UserProfileState {
   fetched: boolean;
   profile: UserProfileInterface;
}

export function createInitialState(): UserProfileState {
  return {
    fetched: false,
    profile: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user-profile' })
export class UserProfileStore extends Store<UserProfileState> {

  constructor() {
    super(createInitialState());
  }

}

