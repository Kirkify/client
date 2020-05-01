import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LocationInterface } from '../models/location.interface';
import { CreateLocationInterface } from '../models/create-location.interface';
import { CrudServiceInterface } from '../../../../../shared/modules/crud/models/crud-service.interface';
import { CrudServiceClass } from '../../../../../shared/modules/crud/models/crud-service.class';
import { CrudDerivedServiceInterface } from '../../../../../shared/modules/crud/models/crud-derived-service.interface';
import { LocationsQuery } from '../state/locations.query';
import { LocationsStore } from '../state/locations.store';
import { JsonResponseInterface } from '../../../../../models/json-response.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationsService extends CrudServiceClass<LocationInterface> implements CrudDerivedServiceInterface, CrudServiceInterface<LocationInterface> {
  private _basePath = '/coach-hub/coach/locations';

  constructor(
    private http: HttpClient,
    private locationsStore: LocationsStore,
    private locationsQuery: LocationsQuery
  ) {
    super(locationsStore, locationsQuery);
    super.setService(this);
  }

  _selectTableValues(): Observable<any> {
    return this.locationsQuery.selectAll();
  }

  _getName(item: LocationInterface): string {
    return item.name;
  }

  _selectAll(): Observable<LocationInterface[]> {
    return this.http
      .get<JsonResponseInterface<LocationInterface[]>>(environment.api_url + this._basePath).pipe(
        map(res => res.data)
      );
  }

  _select(id: string): Observable<LocationInterface> {
    const path = this._basePath + `/${id}`;

    return this.http
      .get<JsonResponseInterface<LocationInterface>>(environment.api_url + path).pipe(
        map(res => res.data)
      );
  }

  _create(value: CreateLocationInterface): Observable<LocationInterface> {
    return this.http
      .post<JsonResponseInterface<LocationInterface>>(environment.api_url + this._basePath, JSON.stringify(value)).pipe(
        map(res => res.data)
      );
  }

  _update(value: LocationInterface) {
    const path = this._basePath + `/${value.id}`;

    return this.http
      .patch<JsonResponseInterface<LocationInterface>>(environment.api_url + path, JSON.stringify(value)).pipe(
        map(res => res.data)
      );
  }

  _delete(item: LocationInterface) {
    const path = this._basePath + `/${item.id}`;

    return this.http
      .delete<void>(environment.api_url + path);
  }
}

