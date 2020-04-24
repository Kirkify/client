import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { NotFoundModule } from './modules/not-found/not-found.module';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './interceptors';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    environment.production ? [] : AkitaNgDevtools,
    AkitaNgRouterStoreModule,

    NotFoundModule
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LewhT8UAAAAALO89pk5gDOhrUKOCqka-XbJvW6z' } as RecaptchaSettings
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
