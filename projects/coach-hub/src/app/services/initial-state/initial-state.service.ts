import { Injectable } from '@angular/core';
import { CategoriesStore } from '../../state/categories/categories.store';
import { GroupsStore } from '../../state/groups/groups.store';
import { HttpClient } from '@angular/common/http';
import { JsonResponseInterface } from '../../models/json-response.interface';
import { environment } from '../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { InitialStateInterface } from './models/initial-state.interface';

@Injectable({
  providedIn: 'root'
})
export class InitialStateService {
  private readonly _basePath = '/coach-hub';

  constructor(
    private categoriesStore: CategoriesStore,
    private groupsStore: GroupsStore,
    private http: HttpClient,
  ) {
  }

  fetchInitialState() {
    const path = this._basePath + '/initial-state';

    return this.http
      .get<JsonResponseInterface<InitialStateInterface>>(environment.api_url + path).pipe(
        map(res => res.data),
        tap(({ categories, groups }) => {
          this.categoriesStore.set(categories);
          this.groupsStore.set(groups);
        })
      );
  }
}
