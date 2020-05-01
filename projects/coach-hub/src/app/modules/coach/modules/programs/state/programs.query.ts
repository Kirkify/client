import { QueryConfig, QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ProgramInterface } from '../../../../app/models/program.interface';
import { ProgramsState, ProgramsStore } from './programs.store';
import { sortByDate } from '../../../../../shared/helpers/sorting/sort-by-date.helper';
import { ProgramsSortByEnum } from '../models/programs-sort-by.enum';
import { sortByName } from '../../../../../shared/helpers/sorting/sort-by-name.helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const sortBy = (a: ProgramInterface, b: ProgramInterface, state: ProgramsState) => {
  switch (state.sortBy) {
    case ProgramsSortByEnum.StartDate:
      return sortByDate(a.program_start, b.program_start, state.sortByOrder);
    case ProgramsSortByEnum.CreatedAt:
      return sortByDate(a.created_at, b.created_at, state.sortByOrder);
    case ProgramsSortByEnum.Name:
      return sortByName(a.program_title, b.program_title, state.sortByOrder);
    default:
      return 0;
  }
};

@Injectable({ providedIn: 'root' })
@QueryConfig({ sortBy })
export class ProgramsQuery extends QueryEntity<ProgramsState, ProgramInterface> {
  constructor(protected store: ProgramsStore) {
    super(store);
  }

  // selectOnce<R>(project: (store: ProgramsState) => R): Observable<R> {
  //   return this.selectOnce(project).pipe(
  //     map(program => {
  //
  //     })
  //   );
  // }
}
