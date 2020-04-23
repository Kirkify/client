import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class DevelopmentInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    req = req.clone({
      setParams: {
        XDEBUG_SESSION_START: environment.x_debug_key
      }
    });

    return next.handle(req);
  }
}
