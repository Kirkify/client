import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ProgressBarStore, ProgressBarState } from './progress-bar.store';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProgressBarQuery extends Query<ProgressBarState> {

  constructor(protected store: ProgressBarStore) {
    super(store);
  }

  selectIsProgressBarLoading$ = this.select(state => state.items).pipe(
    map(items => items.length > 0)
  );

  selectProgressBarHeight$ = combineLatest([
    this.selectIsProgressBarLoading$,
    this.select(store => store.height)
  ]).pipe(
    map(([ isLoading, height ]) => isLoading ? height : 0)
  );
}
