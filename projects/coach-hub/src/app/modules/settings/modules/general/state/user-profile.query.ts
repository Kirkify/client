import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UserProfileStore, UserProfileState } from './user-profile.store';

@Injectable({ providedIn: 'root' })
export class UserProfileQuery extends Query<UserProfileState> {

  constructor(protected store: UserProfileStore) {
    super(store);
  }

  selectProfile$ = this.select(store => store.profile);
}
