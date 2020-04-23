import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // If we have not yet set the Content-Type header
    if (!req.headers.has('Content-Type')) {
      // Then add our default
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    // Set the accept header on all requests
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req);
  }
}
