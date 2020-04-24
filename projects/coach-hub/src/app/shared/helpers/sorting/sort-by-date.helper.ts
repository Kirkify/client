import * as moment from 'moment';
import { SortDirection } from '@angular/material/sort';

export function sortByDate(left, right, order: SortDirection) {
  if (!order) {
    return 0;
  }

  return moment.utc(right).diff(moment.utc(left)) * (order === 'asc' ? -1 : 1);
}
