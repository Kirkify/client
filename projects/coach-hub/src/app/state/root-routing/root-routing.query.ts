import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { RootRoutingStore, AppRoutingState } from './root-routing.store';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RootRoutingQuery extends Query<AppRoutingState> {

  constructor(protected store: RootRoutingStore) {
    super(store);
  }

  selectDefaultRouteOnce$ = this.select(store => store.defaultRoute).pipe(
    take(1)
  );
}
