import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SportInterface } from '../../models/sport.interface';

export interface SportsState extends EntityState<SportInterface> {}

export const SPORTS_STORE_NAME = 'sports';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: SPORTS_STORE_NAME })
export class SportsStore extends EntityStore<SportsState, SportInterface> {

  constructor() {
    super();
  }

}

