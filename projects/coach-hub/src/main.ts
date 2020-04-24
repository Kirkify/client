import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RootModule } from './app/root.module';
import { environment } from './environments/environment';
import { enableAkitaProdMode, persistState } from '@datorama/akita';
import { AUTHENTICATION_STORE_NAME, AuthenticationState } from './app/state/authentication/authentication.store';
import { STORAGE_PROVIDER_KEY } from './app/models/storage-provider-key';
import { SPORTS_STORE_NAME } from './app/modules/app/state/sports/sports.store';
import { COACH_HUB_STORE_NAME } from './app/modules/app/state/coach-hub/coach-hub.store';
import { PROGRAMS_STORE_NAME } from './app/modules/app/modules/coach/modules/programs/state/programs.store';
import { COACH_STORE_NAME } from './app/modules/app/modules/coach/state/coach.store';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

const storage = persistState({
  key: 'ch-state',

  include: [
    AUTHENTICATION_STORE_NAME,
    SPORTS_STORE_NAME,
    COACH_HUB_STORE_NAME,
    COACH_STORE_NAME,
    PROGRAMS_STORE_NAME
  ],

  preStorageUpdate(storeName: string, state: any): any {
    if (storeName === AUTHENTICATION_STORE_NAME) {
      if ((state as AuthenticationState).rememberMe) {
        return state;
      }
    } else {
      return state;
    }
  }
});


const providers = [
  { provide: STORAGE_PROVIDER_KEY, useValue: storage }
];

platformBrowserDynamic(providers).bootstrapModule(RootModule)
  .catch(err => console.error(err));
