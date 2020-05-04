/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DevelopmentInterceptor } from './development-interceptor';
import { GeneralInterceptor } from './general-interceptor';
import { AuthInterceptor } from './auth-interceptor';
import { environment } from '../../environments/environment';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: GeneralInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

if (! environment.production) {
  httpInterceptorProviders.push(
    { provide: HTTP_INTERCEPTORS, useClass: DevelopmentInterceptor, multi: true }
  );
}
