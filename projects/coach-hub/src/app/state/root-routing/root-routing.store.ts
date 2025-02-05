import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { RootRoutesEnum } from '../../root-routes.enum';

export interface AppRoutingState {
  defaultRoute: string;
  forgotPasswordRoute: string;
  dashboardRoute: string;
  coachRoute: string;
  signUpRoute: string;
  loginRoute: string;
  coachSignUpRoute: string;
  messagingRoute: string;
  searchRoute: string;
  settingsRoute: string;
  contactUsRoute: string;
  partnershipsRoute: string;
  legalRoute: string;
  careersRoute: string;
  faqRoute: string;
}

export function createInitialState(): AppRoutingState {
  return {
    defaultRoute: RootRoutesEnum.Dashboard,
    forgotPasswordRoute: `/${ RootRoutesEnum.ForgotPassword }`,
    dashboardRoute: `/${ RootRoutesEnum.Dashboard }`,
    coachRoute: RootRoutesEnum.Coach,
    signUpRoute: `/${ RootRoutesEnum.SignUp }`,
    loginRoute: `/${ RootRoutesEnum.Login }`,
    coachSignUpRoute: `/${ RootRoutesEnum.CoachSignUp }`,
    messagingRoute: `/${ RootRoutesEnum.Messaging }`,
    searchRoute: `/${ RootRoutesEnum.Search }`,
    settingsRoute: `/${ RootRoutesEnum.Settings }`,
    contactUsRoute: `/${ RootRoutesEnum.ContactUs }`,
    partnershipsRoute: `/${ RootRoutesEnum.Partnerships }`,
    legalRoute: `/${ RootRoutesEnum.Legal }`,
    careersRoute: `/${ RootRoutesEnum.Careers }`,
    faqRoute: `/${ RootRoutesEnum.Faq }`
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'app-routing' })
export class RootRoutingStore extends Store<AppRoutingState> {

  constructor() {
    super(createInitialState());
  }

}

