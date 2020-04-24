import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { CategoryType } from '../../models/category.type';

export interface SearchState {
  selectedCategory: CategoryType;
}

export function createInitialState(): SearchState {
  return {
    selectedCategory: 'programs'
  };
}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'search' })
export class SearchStore extends Store<SearchState> {

  constructor() {
    super(createInitialState());
  }

}

