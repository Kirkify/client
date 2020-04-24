import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ProgramInterface } from '../../models/program.interface';
import { programPriceHelper } from '../../shared/helpers/program-price.helper';

export interface ProgramsState extends EntityState<ProgramInterface> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'programs' })
export class ProgramsStore extends EntityStore<ProgramsState, ProgramInterface> {

  constructor() {
    super();
  }

  akitaPreAddEntity(newEntity: Readonly<ProgramInterface>): ProgramInterface {
    return programPriceHelper(newEntity);
  }

}

