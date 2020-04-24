import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonResponseInterface } from '../../../../../shared/models/json-response.interface';
import { environment } from '../../../../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { ProgramsStore } from '../../../state/programs/programs.store';
import { ProgramInterface } from '../../../models/program.interface';

@Injectable({
  providedIn: 'root'
})
export class ProgramViewerService {

  private _basePath = '/coach-hub/programs';

  constructor(
    private http: HttpClient,
    private store: ProgramsStore
  ) {
  }

  selectProgram(id: string) {
    const path = this._basePath + `/${id}`;

    return this.http
      .get<JsonResponseInterface<ProgramInterface[]>>(environment.api_url + path).pipe(
        map(res => res.data),
        tap(program => {
          this.store.add(program);
        })
      );
  }
}
