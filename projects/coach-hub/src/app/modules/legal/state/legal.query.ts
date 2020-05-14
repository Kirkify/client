import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { LegalStore, LegalState } from './legal.store';
import { PartnershipsStore } from '../../partnerships/state/partnerships.store';
import { RootRoutingQuery } from '../../../state/root-routing/root-routing.query';

@Injectable({ providedIn: 'root' })
export class LegalQuery extends Query<LegalState> {

  constructor(
    protected store: LegalStore,
    private rootRoutingQuery: RootRoutingQuery
  ) {
    super(store);
  }

  termsAndConditionsRoute() {
    return `${this.rootRoute()}/${this.getValue().termsAndConditionsRoute}`;
  }

  privacyPolicyRoute() {
    return `${this.rootRoute()}/${this.getValue().privacyPolicyRoute}`;
  }

  private rootRoute() {
    return this.rootRoutingQuery.getValue().legalRoute;
  }
}
