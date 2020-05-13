import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { UpdatePasswordInterface } from '../models/update-password.interface';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) {
  }

  updatePassword(user: UpdatePasswordInterface): Observable<void> {

    const path = '/user/password';

    return this.http
      .post<void>(environment.api_url + path, JSON.stringify(user));
  }

}
