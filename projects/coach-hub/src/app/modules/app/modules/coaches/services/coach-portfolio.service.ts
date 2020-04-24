import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { CoachPortfolioQuery } from '../state/coach-portfolio.query';
import { CoachPortfolioInterface } from '../models/coach-portfolio.interface';
import { CoachPortfolioStore } from '../state/coach-portfolio.store';
import { of } from 'rxjs';
import { JsonResponseInterface } from '../../../../../models/json-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CoachPortfolioService {

  private _basePath = '/coach-hub/coaches';

  constructor(
    private http: HttpClient,
    private store: CoachPortfolioStore,
    private query: CoachPortfolioQuery
  ) {
  }

  selectCoach(name: string) {
    const path = this._basePath + `/${name}`;

    const request$ = this.http
      .get<JsonResponseInterface<CoachPortfolioInterface>>(environment.api_url + path).pipe(
        map(res => res.data),
        tap(entity => {
          this.store.add(entity);
        })
      );

    return this.query.hasEntity(name) ? of() : request$;
  }

  setActive(name: string) {
    this.store.setActive(name.toLowerCase());
  }
}
