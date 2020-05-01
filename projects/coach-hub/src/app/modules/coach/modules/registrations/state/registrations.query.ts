import { QueryConfig, QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { RegistrationInterface } from '../models/registration.interface';
import { RegistrationsState, RegistrationsStore } from './registrations.store';
import { ProgramsQuery } from '../../programs/state/programs.query';
import { combineLatest, Observable } from 'rxjs';
import { auditTime, map } from 'rxjs/operators';
import { RegistrationProgramInterface } from '../models/registration-program.interface';
import { sortByName } from '../../../../../shared/helpers/sorting/sort-by-name.helper';
import { RegistrationsSortByEnum } from '../models/registrations-sort-by.enum';

const sortBy = (a: RegistrationProgramInterface, b: RegistrationProgramInterface, state: RegistrationsState) => {
  switch (state.sortBy) {
    case RegistrationsSortByEnum.Name:
      return sortByName(a.first_name, b.first_name, state.sortByOrder);
    case RegistrationsSortByEnum.ProgramName:
      return sortByName(a.program.program_title, b.program.program_title, state.sortByOrder);
    default:
      return 0;
  }
};

@Injectable({ providedIn: 'root' })
// @QueryConfig({ sortBy })
export class RegistrationsQuery extends QueryEntity<RegistrationsState, RegistrationInterface> {
  constructor(
    protected store: RegistrationsStore,
    private programsQuery: ProgramsQuery
  ) {
    super(store);
  }

  selectAllRegistrations(filters: any[]): Observable<RegistrationProgramInterface[]> {
    return combineLatest(
      this.selectAll({
        filterBy: filters
      }),
      this.programsQuery.selectAll()
    ).pipe(
      auditTime(1),
      map(([registrations, programs]) => {
        return registrations.map(registration => {
          return {
            ...registration,
            program: programs.find(program => program.id === registration.program_id)
          };
        });
      }),
      map(items => {
        const sorted = items.sort((a, b) => sortBy(a, b, this.getValue()));
        return sorted;
      })
    );
  }
}
