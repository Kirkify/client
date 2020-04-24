import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TagsStore, TagsState } from './tags.store';
import { TagInterface } from '../models/tag.interface';

@Injectable({
  providedIn: 'root'
})
export class TagsQuery extends QueryEntity<TagsState, TagInterface> {

  constructor(protected store: TagsStore) {
    super(store);
  }

}
