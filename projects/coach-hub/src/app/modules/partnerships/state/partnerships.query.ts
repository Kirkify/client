import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { PartnershipsStore, PartnershipsState } from './partnerships.store';
import { RootRoutingQuery } from '../../../state/root-routing/root-routing.query';

@Injectable({ providedIn: 'root' })
export class PartnershipsQuery extends Query<PartnershipsState> {

  constructor(
    protected store: PartnershipsStore,
    private rootRoutingQuery: RootRoutingQuery
  ) {
    super(store);
  }

  investorsRoute() {
    return `${this.rootRoute()}/${this.getValue().investorsRoute}`;
  }

  sponsorshipRoute() {
    return `${this.rootRoute()}/${this.getValue().sponsorshipRoute}`;
  }

  private rootRoute() {
    return this.rootRoutingQuery.getValue().partnershipsRoute;
  }
}
