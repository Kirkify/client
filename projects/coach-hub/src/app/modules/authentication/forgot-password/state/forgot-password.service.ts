import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResetPasswordInterface } from '../models/reset-password.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AuthenticationService } from '../../../../state/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(
    private service: AuthenticationService,
    private http: HttpClient
  ) {
  }

  forgotPassword(email: string, captcha): Observable<string> {

    const path = '/forgot-password';

    return this.http
      .post<string>(environment.api_url + path, JSON.stringify({ email, captcha }));
  }

  validateResetToken(credentials: ResetPasswordInterface) {
    return this.service.resetPassword(credentials);
  }
}
