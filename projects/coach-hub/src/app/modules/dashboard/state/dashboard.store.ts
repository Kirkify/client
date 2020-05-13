import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface DashboardState {
  fetched: boolean;
  categoriesSelected: boolean;
}

export function createInitialState(): DashboardState {
  return {
    fetched: false,
    categoriesSelected: false
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'dashboard' })
export class DashboardStore extends Store<DashboardState> {

  constructor() {
    super(createInitialState());
  }

}

