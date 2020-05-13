import { GroupInterface } from './group.interface';

interface CategoryIdInterface {
  category_id: number;
}

export interface GroupCategoryInterface extends GroupInterface {
  categories: CategoryIdInterface[];
}
