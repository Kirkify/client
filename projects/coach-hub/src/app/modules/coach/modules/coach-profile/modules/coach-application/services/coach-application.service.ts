import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { CoachStore } from '../../../../../state/coach.store';
import { CoachProfileInterface } from '../../../../../../app/models/coach-profile.interface';
import { environment } from '../../../../../../../../environments/environment';
import { JsonResponseInterface } from '../../../../../../../models/json-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CoachApplicationService {
  private _basePath = '/coach-hub/coach';

  constructor(
    private http: HttpClient,
    private store: CoachStore,
    ) {
  }

  createNewCoachProfile(value: Partial<CoachProfileInterface>) {
    const path = this._basePath + '/apply-to-coach';

    return this.http
      .post<JsonResponseInterface<CoachProfileInterface[]>>(environment.api_url + path, JSON.stringify(value)).pipe(
        map(res => res.data),
        tap(profiles => {
          this.store.update({ profiles });
        })
      );
  }

  // updateNewCoachProfile(id: number, value: Partial<CoachBaseProfileInterface>) {
  //   const path = this._basePath + '/coach-profile/' + id;
  //
  //   return this.http
  //     .post<JsonResponseInterface<CoachBaseProfileInterface>>(environment.api_url + path, JSON.stringify(value)).pipe(
  //       map(res => res.data),
  //       tap(coachBaseProfile => {
  //         this.store.update({ coachBaseProfile });
  //       })
  //     );
  // }
}
