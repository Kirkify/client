import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriesStore } from './categories.store';

@Injectable({ providedIn: 'root' })
export class CategoriesService {

  constructor(private store: CategoriesStore,
              private http: HttpClient) {
  }

  toggleActive(id: number) {
    this.store.toggleActive(id);
  }
}
