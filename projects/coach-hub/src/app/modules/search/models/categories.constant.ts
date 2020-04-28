import { ToggleItemInterface } from './toggle-item.interface';
import { SearchRoutesEnum } from '../search-routes.enum';

export const categoriesConstant: ToggleItemInterface[] = [
  {
    value: 'coaches',
    icon: 'people',
    display: 'Coaches',
    path: SearchRoutesEnum.Coaches
  },
  {
    value: 'programs',
    icon: 'assignment',
    display: 'Programs',
    path: SearchRoutesEnum.Programs
  }
];
