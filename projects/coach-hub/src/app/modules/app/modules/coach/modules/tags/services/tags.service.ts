import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { TagsStore } from '../state/tags.store';
import { TagInterface } from '../models/tag.interface';
import { EMPTY, throwError } from 'rxjs';
import { environment } from '../../../../../../../../environments/environment';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { TagsQuery } from '../state/tags.query';
import { JsonResponseInterface } from '../../../../../../../models/json-response.interface';

@Injectable({ providedIn: 'root' })
export class TagsService {

  private _basePath = '/coach-hub/coach/tags';

  constructor(
    private store: TagsStore,
    private query: TagsQuery,
    private http: HttpClient
  ) {
  }

  getAll() {

    if (this.query.getValue().fetched) {
      return EMPTY;
    }

    this.store.setLoading(true);

    return this.http
      .get<JsonResponseInterface<TagInterface[]>>(environment.api_url + this._basePath).pipe(
        catchError(err => {
          return throwError(err);
        }),
        finalize(() => this.store.setLoading(false)),
        map(res => res.data),
        tap(tags => {
          this.store.set(tags);
          this.store.update({
            fetched: true
          });
        })
      );
  }

  add(tag: TagInterface) {
    this.store.add(tag);
  }

  update(id, tag: Partial<TagInterface>) {
    this.store.update(id, tag);
  }

  remove(id: ID) {
    this.store.remove(id);
  }
}
