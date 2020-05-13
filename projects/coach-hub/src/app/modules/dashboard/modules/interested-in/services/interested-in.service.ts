import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfileStore } from '../../../../settings/modules/general/state/user-profile.store';
import { Observable, throwError } from 'rxjs';
import { ProfileInterface } from '../../../../settings/modules/general/models/profile.interface';
import { environment } from '../../../../../../environments/environment';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ID } from '@datorama/akita';
import { DashboardService } from '../../../state/dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class InterestedInService {

  constructor(
    private http: HttpClient,
    private service: DashboardService
  ) {
  }

  updateInterests(ids: ID[]) {

    const path = '/coach-hub/initial-state';

    return this.http
      .post<void>(environment.api_url + path, JSON.stringify({
        categories: ids
      })).pipe(
        catchError(err => {
          return throwError(err);
        }),
        tap(() => {
          this.service.updateCategoriesSelected();
        })
      );
  }
}
