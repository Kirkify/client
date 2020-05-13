import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardStore } from './dashboard.store';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { throwError } from 'rxjs';
import { JsonResponseInterface } from '../../../models/json-response.interface';
import { ProfileInterface } from '../../settings/modules/general/models/profile.interface';
import { InitialStateInterface } from './models/initial-state.interface';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  constructor(
    private store: DashboardStore,
    private http: HttpClient) {
  }

  fetchInitialState() {

    const path = '/dashboard';

    return this.http
      .get<JsonResponseInterface<InitialStateInterface>>(environment.api_url + path).pipe(
        map(res => res.data),
        tap(state => {
          this.store.update({
            fetched: true,
            categoriesSelected: state.categoriesSelected
          });
        })
      );
  }

  updateCategoriesSelected() {
    this.store.update({ categoriesSelected: true });
  }
}
