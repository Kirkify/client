import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchStore } from '../state/search/search.store';
import { CoachProfileInterface } from '../../app/models/coach-profile.interface';
import { environment } from '../../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { CategoryType } from '../models/category.type';
import { CoachesStore } from '../state/coaches/coaches.store';
import { ProgramsStore } from '../../app/state/programs/programs.store';
import { ProgramInterface } from '../../app/models/program.interface';
import { JsonResponseInterface } from '../../../models/json-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _basePath = '/coach-hub/search';

  constructor(
    private http: HttpClient,
    private store: SearchStore,
    private coachesStore: CoachesStore,
    private programsStore: ProgramsStore
  ) {
  }

  updateSelectedCategory(category: CategoryType) {
    this.store.update({
      selectedCategory: category
    });
  }

  selectAll(category: CategoryType) {
    if (category === 'coaches') {
      return this.selectAllCoaches();
    } else {
      return this.selectAllPrograms();
    }
  }

  selectAllCoaches() {
    const path = this._basePath + '/coaches';

    return this.http
      .get<JsonResponseInterface<CoachProfileInterface[]>>(environment.api_url + path).pipe(
        map(res => res.data),
        tap(coachProfile => {
          console.log(coachProfile);
          this.coachesStore.set(coachProfile);
        })
      );
  }

  selectAllPrograms() {
    const path = this._basePath + '/programs';

    return this.http
      .get<JsonResponseInterface<ProgramInterface[]>>(environment.api_url + path).pipe(
        map(res => res.data),
        tap(programs => {
          this.programsStore.set(programs);
        })
      );
  }
}
