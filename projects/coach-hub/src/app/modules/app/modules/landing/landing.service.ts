import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, of, range } from 'rxjs';
import { from } from 'rxjs';
import { concatMap, delay, mergeMap } from 'rxjs/operators';
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

    return range(1, 8).pipe(
      concatMap(res1 => of(res1).pipe(
        delay(400),
        mergeMap(res => {
          return this.http
            .get<UserInterface>(environment.api_url + path + '?id=' + res);
        })
      ))
    );
    // return from([ 1, 2, 3, 4, 5, 6, 7, 8 ]).pipe(
    //   interval(2000),
    //   delay(5000),
    //   mergeMap(res => {
    //     return this.http
    //       .get<UserInterface>(environment.api_url + path + '?id=' + res);
    //   })
    // );
  }
}
