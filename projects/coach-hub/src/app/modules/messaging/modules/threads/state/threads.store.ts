import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ThreadInterface } from '../../../models/thread.interface';
import { ThreadSortByEnum } from './models/thread-sort-by.enum';

export interface ThreadsState extends EntityState<ThreadInterface> {
  loaded: boolean;
  sortBy: ThreadSortByEnum;
  active: number[];
  unread: number;
}

const initialState = {
  loaded: false,
  sortBy: ThreadSortByEnum.Recent,
  active: [],
  unread: 0
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'threads' })
export class ThreadsStore extends EntityStore<ThreadsState, ThreadInterface> {
  constructor() {
    super(initialState);
  }

  addActiveThreadId(id: number) {
    this.update(state => ({
      ...state,
      active: [ ...state.active, id ]
    }));
  }

  removeActiveThreadId(id: number) {
    this.update(state => ({
      ...state,
      active: this._spliceArray(state, id)
    }));
  }

  private _spliceArray(state: ThreadsState, id: number) {
    const indexOf = state.active.indexOf(id);

    if (indexOf !== -1) {
      // Since in Dev deepFreeze mode takes all methods away from array so
      // First make a copy
      const newArr = [ ...state.active ];
      // Take away the indexOf
      newArr.splice(indexOf, 1);
      // Return the newly updated array
      return newArr;
    }
    return state.active;
  }
}
