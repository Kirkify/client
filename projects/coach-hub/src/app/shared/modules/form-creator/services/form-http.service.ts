import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { FormInterface } from '../models/form.interface';
import { Observable, of } from 'rxjs';
import { SectionQuestionRequestInterface } from '../models/section-question-request.interface';
import { environment } from '../../../../../environments/environment';
import { JsonResponseInterface } from '../../../../models/json-response.interface';

@Injectable({
  providedIn: 'root'
})
export class FormHttpService {
  private _basePath = '/form-hub';
  private _formMap = new Map<string, FormInterface>();

  constructor(
    private http: HttpClient,
  ) {
  }

  createNewForm(val = {}) {
    const path = this._basePath + '/new';

    return this.http
      .post<JsonResponseInterface<FormInterface>>(environment.api_url + path, JSON.stringify(val)).pipe(
        map(res => res.data),
        tap(form => {
          this._formMap.set(form.id, form);
        })
      );
  }

  getForm(id: string): Observable<FormInterface> {

    if (this._formMap.has(id)) {
      return of(this._formMap.get(id));
    }

    const path = this._basePath + '/get/' + id;

    return this.http
      .get<JsonResponseInterface<FormInterface>>(environment.api_url + path).pipe(
        map(res => res.data),
        tap(form => {
          this._formMap.set(form.id, form);
        })
      );
  }

  updateForm(id: string, value: SectionQuestionRequestInterface) {
    const path = this._basePath + '/update/' + id;

    this.http
      .post<JsonResponseInterface<FormInterface>>(environment.api_url + path, JSON.stringify(value)).pipe(
      map(res => res.data),
      tap(form => {
        this._formMap.set(form.id, form);
      })
    )
      .subscribe();
  }
}
