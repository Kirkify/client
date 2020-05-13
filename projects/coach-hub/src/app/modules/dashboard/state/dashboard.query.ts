import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { DashboardStore, DashboardState } from './dashboard.store';

@Injectable({ providedIn: 'root' })
export class DashboardQuery extends Query<DashboardState> {

  constructor(protected store: DashboardStore) {
    super(store);
  }

  fetched$ = this.select(store => store.fetched);

  categoriesSelected$ = this.select(store => store.categoriesSelected);
}
