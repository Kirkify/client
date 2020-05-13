import { SportInterface } from './sport.interface';
import { CoachBaseProfileInterface } from './coach-base-profile.interface';
import { CategoryInterface } from '../../../state/categories/models/category.interface';
import { GroupCategoryInterface } from '../../../state/coach/models/group-category.interface';

export interface CoachHubInitialStateInterface {
  categories: CategoryInterface[];
  groups: GroupCategoryInterface[];
  sports: SportInterface[];
  coachBaseProfile: CoachBaseProfileInterface;
}
