import { Injectable } from '@angular/core';
import { arrayAdd, arrayRemove, Store, StoreConfig } from '@datorama/akita';

export interface ProgressBarState {
  items: string[];
  height: number;
}

export function createInitialState(): ProgressBarState {
  return {
    items: [],
    height: 3
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'progress-bar' })
export class ProgressBarStore extends Store<ProgressBarState> {

  constructor() {
    super(createInitialState());
  }

  addProgressBarItem(item: string) {
    this.update(state => ( { items: arrayAdd(state.items, item) } ));
  }

  hideProgressBarItem(item: string) {
    this.update(state => ( { items: arrayRemove(state.items, item) } ));
  }

}

