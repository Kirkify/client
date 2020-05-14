import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { PartnershipsRoutesEnum } from '../partnerships-routes.enum';

export interface PartnershipsState {
   investorsRoute: string;
   sponsorshipRoute: string;
}

export function createInitialState(): PartnershipsState {
  return {
    investorsRoute: PartnershipsRoutesEnum.Investors,
    sponsorshipRoute: PartnershipsRoutesEnum.Sponsorship
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'partnerships' })
export class PartnershipsStore extends Store<PartnershipsState> {

  constructor() {
    super(createInitialState());
  }

}

