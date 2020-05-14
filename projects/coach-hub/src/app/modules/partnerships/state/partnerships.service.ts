import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PartnershipsStore } from './partnerships.store';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PartnershipsService {

  constructor(private partnershipsStore: PartnershipsStore,
              private http: HttpClient) {
  }

}
