import { SortDirection } from '@angular/material/sort';

export interface CrudStateInterface<Entity> {
  fetched: boolean;
  isDeleting: boolean;
  sortBy?: any;
  sortByOrder?: SortDirection;
}
