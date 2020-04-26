import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UserInterface } from '../../../../state/authentication/models/user.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private http: HttpClient) {
  }

  fetchDashboard(): Observable<UserInterface> {

    const path = '/dashboard';

    return from([ 1, 2, 3, 4, 5, 6, 7, 8 ]).pipe(
      mergeMap(res => {
        return this.http
          .get<UserInterface>(environment.api_url + path + '?id=' + res);
      })
    );
  }
}
