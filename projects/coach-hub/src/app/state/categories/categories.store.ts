import { Injectable } from '@angular/core';
import { EntityState, EntityStore, MultiActiveState, StoreConfig } from '@datorama/akita';
import { CategoryInterface } from './models/category.interface';

export interface CategoriesState extends EntityState<CategoryInterface>, MultiActiveState {}

const initialState = {
  active: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'categories' })
export class CategoriesStore extends EntityStore<CategoriesState> {
  constructor() {
    super(initialState);
  }
}

