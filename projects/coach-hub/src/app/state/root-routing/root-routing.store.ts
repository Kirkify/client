import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { RootRoutesEnum } from '../../root-routes.enum';

export interface AppRoutingState {
   defaultRoute: string;
   forgotPasswordRoute: string;
}

export function createInitialState(): AppRoutingState {
  return {
    defaultRoute: RootRoutesEnum.App,
    forgotPasswordRoute: `/${RootRoutesEnum.ForgotPassword}`
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'app-routing' })
export class RootRoutingStore extends Store<AppRoutingState> {

  constructor() {
    super(createInitialState());
  }

}

