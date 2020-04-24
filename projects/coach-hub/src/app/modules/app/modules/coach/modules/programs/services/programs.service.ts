import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProgramsStore } from '../state/programs.store';
import { ProgramsQuery } from '../state/programs.query';
import { ProgramInterface } from '../../../../../models/program.interface';
import { CreateProgramInterface } from '../models/create-program.interface';
import { environment } from '../../../../../../../../environments/environment';
import { CrudServiceClass } from '../../../../../../../shared/modules/crud/models/crud-service.class';
import { CrudDerivedServiceInterface } from '../../../../../../../shared/modules/crud/models/crud-derived-service.interface';
import { ProgramsSortByEnum } from '../models/programs-sort-by.enum';
import { RegistrationInterface } from '../../registrations/models/registration.interface';
import { WebSocketQuery } from '../../../../../../../state/web-socket/web-socket.query';
import { JsonResponseInterface } from '../../../../../../../models/json-response.interface';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService extends CrudServiceClass<ProgramInterface> implements CrudDerivedServiceInterface {
  static readonly TITLE = 'program_title';
  static readonly PROGRAM_START = 'program_start';
  static readonly REGISTRATIONS_COUNT = 'registrations_count';

  private _basePath = '/coach-hub/coach/programs';

  constructor(
    private http: HttpClient,
    private programsStore: ProgramsStore,
    private programsQuery: ProgramsQuery,
    private socketQuery: WebSocketQuery
  ) {
    super(programsStore, programsQuery);
    super.setService(this);

    // this.socketQuery.onSocketMessage().pipe(
    //   filter(x => x.event === 'App\\Events\\CoachHub\\RegistrationEvent'),
    //   tap(x => {
    //     const newRegistration = x.data as RegistrationInterface;
    //     this.programsStore.update(newRegistration.program_id, entity => ({
    //       ...entity,
    //       registrations_count: entity.registrations_count + 1
    //     }));
    //   })
    // ).subscribe();
  }

  addForm(programId: string, formId: string) {
    const path = this._basePath + '/add-form/' + programId;

    return this.http
      .post<JsonResponseInterface<ProgramInterface>>(environment.api_url + path, JSON.stringify({
        form_id: formId
      })).pipe(
        map(res => res.data)
      );
  }

  _selectTableValues(): Observable<any> {
    return this.filters.pipe(
      switchMap(filters => {
        return this.programsQuery.selectAll({
          filterBy: this._getFilterBy(filters)
        });
      })
    );
  }

  _sort(sort: Sort): void {
    switch (sort.active) {
      case ProgramsService.TITLE:
        this.programsStore.update({
          sortBy: ProgramsSortByEnum.Name,
          sortByOrder: sort.direction
        });
        break;
      case ProgramsService.PROGRAM_START:
        this.programsStore.update({
          sortBy: ProgramsSortByEnum.StartDate,
          sortByOrder: sort.direction
        });
    }
  }

  _selectAll(): Observable<ProgramInterface[]> {
    return this.http
      .get<JsonResponseInterface<ProgramInterface[]>>(environment.api_url + this._basePath).pipe(
        map(res => res.data)
      );
  }

  _select(id: string): Observable<ProgramInterface> {
    const path = this._basePath + `/${ id }`;

    return this.http
      .get<JsonResponseInterface<ProgramInterface>>(environment.api_url + path).pipe(
        map(res => res.data)
      );
  }

  _create(value: CreateProgramInterface): Observable<ProgramInterface> {
    return this.http
      .post<JsonResponseInterface<ProgramInterface>>(environment.api_url + this._basePath, JSON.stringify(value)).pipe(
        map(res => res.data)
      );
  }

  _update(value: ProgramInterface) {
    const path = this._basePath + `/${ value.id }`;

    return this.http
      .patch<JsonResponseInterface<ProgramInterface>>(environment.api_url + path, JSON.stringify(value)).pipe(
        map(res => res.data)
      );
  }

  _getName(item: ProgramInterface): string {
    return item.program_title;
  }

  _delete(item: ProgramInterface) {
    const path = this._basePath + `/${ item.id }`;

    return this.http
      .delete<void>(environment.api_url + path);
  }

  private _getFilterBy(filters: { [ k: string ]: any }) {
    const f = [] as any[];
    if (filters.hasOwnProperty('programId')) {
      f.push((item: RegistrationInterface) => item.id === filters.programId);
    }
    return f;
  }
}

