import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoachStore } from './coach.store';
import { finalize, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SportsStore } from '../../modules/app/state/sports/sports.store';
import { JsonResponseInterface } from '../../models/json-response.interface';
import { CoachHubInitialStateInterface } from '../../modules/app/models/coach-hub-initial-state.interface';
import { environment } from '../../../environments/environment';
import { CoachBaseProfileInterface } from '../../modules/app/models/coach-base-profile.interface';
import { ProgressBarService } from '../progress-bar/progress-bar.service';

@Injectable({ providedIn: 'root' })
export class CoachService {

  private _basePath = '/coach-hub';

  constructor(
    private http: HttpClient,
    private router: Router,
    private progressBarService: ProgressBarService,
    private coachStore: CoachStore,
    private sportsStore: SportsStore
  ) {
  }

  getInitialState() {
    const path = this._basePath + '/initial-coach-state';

    const id = this.progressBarService.showProgressBar();

    return this.http
      .get<JsonResponseInterface<CoachHubInitialStateInterface>>(environment.api_url + path).pipe(
        finalize(() => this.progressBarService.hideProgressBar(id)),
        map(res => res.data),
        tap(state => {
          console.log(state);
          this.coachStore.update({
            fetched: true,
            baseProfile: state.coachBaseProfile
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
          this.coachStore.updateBaseProfile(coachBaseProfile);
        })
      );
  }

  updateNewCoachProfile(id: number, value: Partial<CoachBaseProfileInterface>) {
    const path = this._basePath + '/coach-profile/' + id;

    return this.http
      .post<JsonResponseInterface<CoachBaseProfileInterface>>(environment.api_url + path, JSON.stringify(value)).pipe(
        map(res => res.data),
        tap(coachBaseProfile => {
          this.coachStore.updateBaseProfile(coachBaseProfile);
        })
      );
  }

}
