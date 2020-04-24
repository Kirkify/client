import { SortDirection } from '@angular/material/sort';

export interface ColumnDisplayInterface {
  columnName: string;
  displayName: string;
  displayFunc: (item: any) => string;
  linkable?: boolean;
  linkableRoute?: (item: any) => string;
  sortable?: boolean;
  activeSort?: boolean;
  activeSortDirection?: SortDirection;
}
