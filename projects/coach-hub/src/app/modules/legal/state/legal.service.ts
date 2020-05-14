import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LegalStore } from './legal.store';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LegalService {

  constructor(private legalStore: LegalStore,
              private http: HttpClient) {
  }

}
