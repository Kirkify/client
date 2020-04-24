import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SearchState, SearchStore } from './search.store';

@Injectable({
  providedIn: 'root'
})
export class SearchQuery extends Query<SearchState> {

  constructor(
    protected store: SearchStore,
  ) {
    super(store);
  }

  selectedCategory() {
    return this.select(store => store.selectedCategory);
  }
}
