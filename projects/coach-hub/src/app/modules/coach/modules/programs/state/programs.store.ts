import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ProgramInterface } from '../../../../app/models/program.interface';
import { CrudStateInterface } from '../../../../../shared/modules/crud/models/crud-state.interface';
import { ProgramsSortByEnum } from '../models/programs-sort-by.enum';

export interface ProgramsState extends EntityState<ProgramInterface>, CrudStateInterface<ProgramInterface> {
  sortBy: ProgramsSortByEnum;
}

const initialState: ProgramsState = {
  sortBy: ProgramsSortByEnum.StartDate,
  sortByOrder: 'asc',
  fetched: false,
  isDeleting: false
};

export const PROGRAMS_STORE_NAME = 'programs';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: PROGRAMS_STORE_NAME })
export class ProgramsStore extends EntityStore<ProgramsState, ProgramInterface> {
  constructor() {
    super(initialState);
  }

  akitaPreAddEntity(program: Readonly<ProgramInterface>): ProgramInterface {
    const rootPrices = program.prices.filter(x => x.sub_options !== null);

    for (const rootPrice of rootPrices) {
      rootPrice.sub_options_values = [];
      for (const subOptionGuid of rootPrice.sub_options) {
        const subOption = program.prices.find(x => x.guid === subOptionGuid);

        if (subOption) {
          rootPrice.sub_options_values.push(subOption);
        }
      }
    }

    return {
      ...program,
      prices: rootPrices
    };
  }
}
