import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { CoachHubStore } from '../state/coach-hub/coach-hub.store';
import { CoachHubInitialStateInterface } from '../models/coach-hub-initial-state.interface';
import { SportsStore } from '../state/sports/sports.store';
import { CoachBaseProfileInterface } from '../models/coach-base-profile.interface';
import { Router } from '@angular/router';
import { JsonResponseInterface } from '../../../models/json-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CoachHubService {
  private _basePath = '/coach-hub';

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: CoachHubStore,
    private sportsStore: SportsStore
    ) {
  }

  getInitialState() {
    const path = this._basePath + '/initial-state';

    return this.http
      .get<JsonResponseInterface<CoachHubInitialStateInterface>>(environment.api_url + path).pipe(
        map(res => res.data),
        tap(state => {
          this.store.update({
            hasInitialStateBeenFetched: true,
            coachBaseProfile: state.coachBaseProfile
          });
          this.sportsStore.set(state.sports);
        })
      );
  }

  createNewCoachProfile(value: Partial<CoachBaseProfileInterface>) {
    const path = this._basePath + '/coach-profile';

    return this.http
      .post<JsonResponseInterface<CoachBaseProfileInterface>>(environment.api_url + path, JSON.stringify(value)).pipe(
        map(res => res.data),
        tap(coachBaseProfile => {
          this.store.update({ coachBaseProfile });
        })
      );
  }

  updateNewCoachProfile(id: number, value: Partial<CoachBaseProfileInterface>) {
    const path = this._basePath + '/coach-profile/' + id;

    return this.http
      .post<JsonResponseInterface<CoachBaseProfileInterface>>(environment.api_url + path, JSON.stringify(value)).pipe(
        map(res => res.data),
        tap(coachBaseProfile => {
          this.store.update({ coachBaseProfile });
        })
      );
  }
}
