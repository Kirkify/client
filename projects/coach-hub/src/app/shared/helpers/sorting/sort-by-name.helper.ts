import { SortDirection } from '@angular/material/sort';

export function sortByName(left: string, right: string, order: SortDirection) {
  if (!order) {
    return 0;
  }

  const nameA = left.toUpperCase(); // ignore upper and lowercase
  const nameB = right.toUpperCase(); // ignore upper and lowercase

  if (nameA < nameB) {
    return -1 * (order === 'asc' ? 1 : -1);
  }
  if (nameA > nameB) {
    return (order === 'asc' ? 1 : -1);
  }

  // names must be equal
  return 0;
}
