import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { LegalRoutesEnum } from '../legal-routes.enum';

export interface LegalState {
   termsAndConditionsRoute: string;
   privacyPolicyRoute: string;
}

export function createInitialState(): LegalState {
  return {
    termsAndConditionsRoute: LegalRoutesEnum.TermsAndConditions,
    privacyPolicyRoute: LegalRoutesEnum.PrivacyPolicy
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'legal' })
export class LegalStore extends Store<LegalState> {

  constructor() {
    super(createInitialState());
  }

}

