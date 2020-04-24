import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { AppRoutesEnum } from '../../app-routes.enum';

export interface AppRoutingState {
   defaultRoute: string;
}

export function createInitialState(): AppRoutingState {
  return {
    defaultRoute: AppRoutesEnum.Dashboard
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'app-routing' })
export class AppRoutingStore extends Store<AppRoutingState> {

  constructor() {
    super(createInitialState());
  }

}

