import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RootModule } from './app/root.module';
import { environment } from './environments/environment';
import { akitaConfig, enableAkitaProdMode, persistState } from '@datorama/akita';
import { AUTHENTICATION_STORE_NAME, AuthenticationState } from './app/state/authentication/authentication.store';
import { STORAGE_PROVIDER_KEY } from './app/models/storage-provider-key';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

akitaConfig({
  resettable: true
});

const storage = persistState({
  key: 'ch-state',

  include: [
    AUTHENTICATION_STORE_NAME,
    // SPORTS_STORE_NAME,
    // COACH_HUB_STORE_NAME,
    // COACH_STORE_NAME,
    // PROGRAMS_STORE_NAME
  ],

  preStorageUpdate(storeName: string, state: any): any {
    if (storeName === AUTHENTICATION_STORE_NAME) {
      if ((state as AuthenticationState).rememberToken) {
        const authState: AuthenticationState = state;
        return {
          token: authState.token,
          rememberToken: authState.rememberToken
        } as AuthenticationState;
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
