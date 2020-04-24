import { Observable } from 'rxjs';
import { Sort } from '@angular/material/sort';

export interface CrudDerivedServiceInterface {
  _create(item: any): Observable<any>;
  _update(item: any): Observable<any>;
  _selectAll(force: boolean): Observable<any>;
  _select(id: string): Observable<any>;
  _getName(item: any): string;
  _delete(item: any): Observable<void>;
  _selectTableValues(): Observable<any>;
  _sort?(sort: Sort): void;
}
