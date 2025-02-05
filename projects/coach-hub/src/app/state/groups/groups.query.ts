import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { GroupsState, GroupsStore } from './groups.store';

@Injectable({
  providedIn: 'root'
})
export class GroupsQuery extends QueryEntity<GroupsState> {

  constructor(
    protected store: GroupsStore,
  ) {
    super(store);
  }
}
