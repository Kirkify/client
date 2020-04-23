import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableAkitaProdMode, persistState } from '@datorama/akita';
import { AUTHENTICATION_STORE_NAME, AuthenticationState } from './app/state/authentication/authentication.store';
import { STORAGE_PROVIDER_KEY } from './app/models/storage-provider-key';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

const storage = persistState({
  key: 'ch-state',

  include: [
    AUTHENTICATION_STORE_NAME
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

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
