import { Observable } from 'rxjs';
import { EntityStore, QueryEntity } from '@datorama/akita';
import { CrudStateInterface } from './crud-state.interface';
import { Sort } from '@angular/material/sort';

export interface CrudServiceInterface<T> {
  readonly store: EntityStore<CrudStateInterface<any>, any>;
  readonly query: QueryEntity<CrudStateInterface<any>, any>;
  readonly filters: Observable<{ [k: string]: any }>;
  canDeactivate: (canDeactivate: boolean) => (Observable<boolean> | Promise<boolean> | boolean);
  getItemName(item: any): string;
  selectTableValues(): Observable<any>;
  sort(sort: Sort): void;
  addFilter(value: { [k: string]: any });
  create(item: any): Observable<any>;
  update(item: any): Observable<any>;
  selectAll(force: boolean): Observable<any>;
  select(id: string): Observable<any>;
  destroy(item: any): Observable<void>;
}
