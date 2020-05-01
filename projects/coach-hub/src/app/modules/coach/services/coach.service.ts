import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { CoachStore } from '../state/coach.store';
import { CoachInitialStateInterface } from '../models/coach-initial-state.interface';
import { JsonResponseInterface } from '../../../models/json-response.interface';


@Injectable({
  providedIn: 'root',
})
export class CoachService {
  private _basePath = '/coach-hub/coach';

  constructor(
    private http: HttpClient,
    private store: CoachStore,
  ) {
  }

  init() {

  }

  getInitialState() {
    const path = this._basePath + '/initial-state';

    return this.http
      .get<JsonResponseInterface<CoachInitialStateInterface>>(environment.api_url + path).pipe(
        map(res => res.data),
        tap(state => {
          this.store.update({
            hasInitialStateBeenFetched: true,
            profiles: state.profiles
          });
        })
      );
  }
}
