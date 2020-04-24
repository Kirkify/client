import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AppRoutingStore, AppRoutingState } from './app-routing.store';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppRoutingQuery extends Query<AppRoutingState> {

  constructor(protected store: AppRoutingStore) {
    super(store);
  }

  selectDefaultRouteOnce$ = this.select(store => store.defaultRoute).pipe(
    take(1)
  );
}
