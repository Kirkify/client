import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppRoutingStore } from './app-routing.store';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppRoutingService {

  constructor(private appRoutingStore: AppRoutingStore,
              private http: HttpClient) {
  }

}
