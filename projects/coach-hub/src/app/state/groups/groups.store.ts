import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { GroupCategoryInterface } from '../coach/models/group-category.interface';

export interface GroupsState extends EntityState<GroupCategoryInterface> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'categories' })
export class GroupsStore extends EntityStore<GroupsState> {
  constructor() {
    super();
  }
}

