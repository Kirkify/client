import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgressBarStore } from './progress-bar.store';
import { guid } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class ProgressBarService {

  constructor(
    private store: ProgressBarStore,
    private http: HttpClient) {
  }

  /**
   * Whoever calls this method, needs to make sure they call the hide
   * ProgressBar method so that it doesn't stay in a loading state
   *
   */
  showProgressBar() {
    const item = guid();
    this.store.addProgressBarItem(item);
    return item;
  }

  hideProgressBar(item: string) {
    this.store.hideProgressBarItem(item);
  }
}
