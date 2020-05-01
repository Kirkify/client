import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TagInterface } from '../models/tag.interface';

export interface TagsState extends EntityState<TagInterface> {
  fetched: boolean;
}

const initialState: TagsState = {
  fetched: false
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tags' })
export class TagsStore extends EntityStore<TagsState, TagInterface> {

  constructor() {
    super(initialState);
  }

}

