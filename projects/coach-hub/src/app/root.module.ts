import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { NotFoundModule } from './modules/not-found/not-found.module';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './interceptors';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { setAppInjector } from './app-injector';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    RootComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    RootRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    environment.production ? [] : AkitaNgDevtools,
    AkitaNgRouterStoreModule,

    NotFoundModule,

    MatDialogModule
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LewhT8UAAAAALO89pk5gDOhrUKOCqka-XbJvW6z' } as RecaptchaSettings
    }
  ],
  bootstrap: [ RootComponent ]
})
export class RootModule {
  constructor(private injector: Injector) {
    setAppInjector(injector);
  }
}
