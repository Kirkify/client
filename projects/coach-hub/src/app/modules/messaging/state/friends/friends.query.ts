import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { FriendsState, FriendsStore } from './friends.store';
import { UserInterface } from '../../../../state/authentication/models/user.interface';


@Injectable({ providedIn: 'root' })
export class FriendsQuery extends QueryEntity<FriendsState, Partial<UserInterface>> {
  constructor(protected store: FriendsStore) {
    super(store);
  }

  get loaded() {
    return this.getValue().loaded;
  }
}
