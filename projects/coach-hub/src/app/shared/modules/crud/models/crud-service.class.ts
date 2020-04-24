import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { CrudDerivedServiceInterface } from './crud-derived-service.interface';
import { CrudServiceInterface } from './crud-service.interface';
import { EntityStore, QueryEntity } from '@datorama/akita';
import { CrudStateInterface } from './crud-state.interface';
import { UiService } from '../../../../state/ui/ui.service';
import { Sort } from '@angular/material/sort';
import { AppInjector } from '../../../../app-injector';
import { DialogService } from '../../../../services/dialog/dialog.service';

export class CrudServiceClass<T> implements CrudServiceInterface<T> {

  readonly store: EntityStore<CrudStateInterface<any>, any>;
  readonly query: QueryEntity<CrudStateInterface<any>, any>;
  service: CrudDerivedServiceInterface;
  dialogService: DialogService;
  uiService: UiService;

  private _filters = new BehaviorSubject<{ [k: string]: any }>({});
  get filters() {
    return this._filters.asObservable();
  }

  constructor(
    store: EntityStore<CrudStateInterface<any>, any>,
    query: QueryEntity<CrudStateInterface<any>, any>
  ) {
    this.store = store;
    this.query = query;
    this.dialogService = AppInjector.get(DialogService);
    this.uiService = AppInjector.get(UiService);
  }

  setService(service: CrudDerivedServiceInterface) {
    this.service = service;
  }

  canDeactivate(canDeactivate: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!canDeactivate) {
      return this.dialogService.unsavedChangesConfirmation();
    }
    return true;
  }

  selectTableValues(): Observable<any> {
    return this.service._selectTableValues();
  }

  getItemName(item: any): string {
    return this.service._getName(item);
  }

  addFilter(value: { [ k: string ]: any }) {
    this._filters.next(value);
  }

  sort(sort: Sort) {
    if (this.service._sort) {
      this.service._sort(sort);
    } else {
      console.error('No sort setup on derived class');
    }
  }

  selectAll(force = false) {
    return this.query.select(store => store.fetched).pipe(
      take(1),
      switchMap(fetched => {
        if (!force && fetched) {
          return this.query.selectAll();
        } else {
          this.store.setLoading(true);

          return this.service._selectAll(force).pipe(
            catchError(err => {
              this.store.setError(err);
              return throwError(err);
            }),
            finalize(() => {
              this.store.setLoading(false);
            }),
            tap(items => {
              this.store.set(items);
              this.store.update({
                fetched: true
              });
            })
          );
        }
      })
    );
  }

  select(id: string): Observable<any> {
    const entity = this.query.getEntity(id);

    if (entity) {
      return of(entity);
    }

    return this.service._select(id).pipe(
      catchError(err => {
        return throwError(err);
      }),
      finalize(() => this.store.setLoading(false)),
      tap(item => {
        this.store.add(item);
      }),
      switchMap(() => {
        return this.query.selectEntity(id).pipe(
          take(1)
        );
      })
    );
  }

  update(value: any) {
    return this.service._update(value).pipe(
      tap(item => {
        this.store.update(item.id, item);
      })
    );
  }

  create(value: any): Observable<T> {
    return this.service._create(value).pipe(
      map(item => {
        this.store.add(item);
        return item[this.store.idKey];
      }),
      map(id => this.query.getEntity(id))
    );
  }

  destroy(item: any) {
    const name = this.service._getName(item);
    return this.dialogService.deleteConfirmation(name).pipe(
      mergeMap(result => {
        if (result) {
          return this._destroy(item, name);
        }
        return EMPTY;
      })
    );
  }

  private _destroy(item: any, name: string) {

    this.store.update({
      isDeleting: true
    });

    return this.service._delete(item).pipe(
      catchError(err => {
        return throwError(err);
      }),
      finalize(() => this.store.update({ isDeleting: false })),
      tap(() => {
        this.store.remove(item.id);
        this.uiService.showSnackbar(`${ name } has been deleted successfully`);
      })
    );
  }
}
