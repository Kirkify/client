import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactInterface } from '../models/contact.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {
  }

  contact(user: ContactInterface): Observable<string> {

    const path = '/contact';

    return this.http
      .post<string>(environment.api_url + path, JSON.stringify(user));
  }
}
