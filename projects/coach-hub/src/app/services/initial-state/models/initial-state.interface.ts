import { CategoryInterface } from '../../../state/categories/models/category.interface';
import { GroupCategoryInterface } from '../../../state/coach/models/group-category.interface';

export interface InitialStateInterface {
  categories: CategoryInterface[];
  groups: GroupCategoryInterface[];
}
