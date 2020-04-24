import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootRoutingStore } from './root-routing.store';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RootRoutingService {

  constructor(private appRoutingStore: RootRoutingStore,
              private http: HttpClient) {
  }

}
