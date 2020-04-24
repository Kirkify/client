import { Injectable } from '@angular/core';
import { filterNil, QueryEntity } from '@datorama/akita';
import { ProgramsState, ProgramsStore } from './programs.store';
import { ProgramInterface } from '../../models/program.interface';

@Injectable({
  providedIn: 'root'
})
export class ProgramsQuery extends QueryEntity<ProgramsState, ProgramInterface> {

  constructor(protected store: ProgramsStore) {
    super(store);
  }

  selectProgram(id) {
    return this.selectEntity(id).pipe(
      filterNil
    );
  }

  getProgram(id) {
    return this.getEntity(id);
  }
}
