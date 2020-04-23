import { filterNil, QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { UsersState, UsersStore } from './users.store';
import { combineLatest, of } from 'rxjs';
import { UserInterface } from '../../../../state/authentication/models/user.interface';

@Injectable({ providedIn: 'root' })
export class UsersQuery extends QueryEntity<UsersState, Partial<UserInterface>> {
  constructor(protected store: UsersStore) {
    super(store);
  }

  // We need to override the selectMany as the auditMap is continuously subscribing
  selectMany(ids: number[]) {
    if (!ids || !ids.length) {
      return of([]);
    }

    const entities = ids.map(id => this.selectEntity(id).pipe(filterNil));

    return combineLatest(entities);
  }
}
