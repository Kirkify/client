import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RegistrationsStore } from '../state/registrations.store';
import { RegistrationsQuery } from '../state/registrations.query';
import { RegistrationInterface } from '../models/registration.interface';
import { CreateRegistrationInterface } from '../models/create-registration.interface';
import { CrudServiceInterface } from '../../../../../shared/modules/crud/models/crud-service.interface';
import { environment } from '../../../../../../environments/environment';
import { CrudServiceClass } from '../../../../../shared/modules/crud/models/crud-service.class';
import { CrudDerivedServiceInterface } from '../../../../../shared/modules/crud/models/crud-derived-service.interface';
import { ProgramsService } from '../../programs/services/programs.service';
import { RegistrationsSortByEnum } from '../models/registrations-sort-by.enum';
import { QueryParamsEnum } from '../../shared/models/query-params.enum';
import { Sort } from '@angular/material/sort';
import { JsonResponseInterface } from '../../../../../models/json-response.interface';

@Injectable({
  providedIn: 'root',
})
export class RegistrationsService extends CrudServiceClass<RegistrationInterface> implements CrudDerivedServiceInterface, CrudServiceInterface<RegistrationInterface> {
  static readonly NAME = 'name';
  static readonly PROGRAM = 'program';

  private _basePath = '/coach-hub/coach/registrations';

  constructor(
    private http: HttpClient,
    private programsService: ProgramsService,
    private registrationsStore: RegistrationsStore,
    private registrationsQuery: RegistrationsQuery
  ) {
    super(registrationsStore, registrationsQuery);
    super.setService(this);
  }

  _selectTableValues(): Observable<any> {
    return this.filters.pipe(
      switchMap(filters => {
        return this.registrationsQuery.selectAllRegistrations(this._getFilterBy(filters));
      })
    );
  }

  _sort(sort: Sort): void {
    switch (sort.active) {
      case RegistrationsService.NAME:
        this.registrationsStore.update({
          sortBy: RegistrationsSortByEnum.Name,
          sortByOrder: sort.direction
        });
        break;
      case RegistrationsService.PROGRAM:
        this.registrationsStore.update({
          sortBy: RegistrationsSortByEnum.ProgramName,
          sortByOrder: sort.direction
        });
    }
  }

  _selectAll(force: boolean): Observable<RegistrationInterface[]> {
    return this.programsService.selectAll(force).pipe(
      switchMap(() => this.http.get<JsonResponseInterface<RegistrationInterface[]>>(environment.api_url + this._basePath).pipe(
        map(res => {
          return res.data;
        })
      ))
    );
  }

  _select(id: string): Observable<RegistrationInterface> {
    const path = this._basePath + `/${ id }`;

    return this.http
      .get<JsonResponseInterface<RegistrationInterface>>(environment.api_url + path).pipe(
        map(res => res.data)
      );
  }

  _create(value: CreateRegistrationInterface): Observable<RegistrationInterface> {
    return this.http
      .post<JsonResponseInterface<RegistrationInterface>>(environment.api_url + this._basePath, JSON.stringify(value)).pipe(
        map(res => res.data)
      );
  }

  _update(value: RegistrationInterface) {
    const path = this._basePath + `/${ value.id }`;

    return this.http
      .patch<JsonResponseInterface<RegistrationInterface>>(environment.api_url + path, JSON.stringify(value)).pipe(
        map(res => res.data)
      );
  }

  _getName(item: RegistrationInterface): string {
    return item.first_name;
  }

  _delete(item: RegistrationInterface) {
    const path = this._basePath + `/${ item.id }`;

    return this.http
      .delete<void>(environment.api_url + path);
  }

  private _getFilterBy(filters: { [k: string]: any }) {
    const f = [] as any[];
    if (filters.hasOwnProperty(QueryParamsEnum.ProgramId)) {
      f.push((item: RegistrationInterface) => item.program_id === parseInt(filters[QueryParamsEnum.ProgramId], 10));
    }
    return f;
  }
}
