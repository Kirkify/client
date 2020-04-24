import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UiStore, UiState } from './ui.store';
import { MediaBreakpointsEnum } from './models/media-breakpoints.enum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UiQuery extends Query<UiState> {

  constructor(protected store: UiStore) {
    super(store);
  }

  getIsScreenWidthMediumOrGreater(): boolean {
    return this._isWidthMediumOrGreater(this.getValue().screenWidth);
  }

  selectShouldAppContainerHideOverflow(): Observable<boolean> {
    return this.select(store => store.hideAppOverflow);
  }

  selectIsScreenWidthMediumOrGreater(): Observable<boolean> {
    return this.select(state => state.screenWidth).pipe(
      map(size => this._isWidthMediumOrGreater(size))
    );
  }

  selectIsScreenWidthSmall(): Observable<boolean> {
    return this.selectIsScreenWidthMediumOrGreater().pipe(
      map(isWidthGreaterThanMedium => !isWidthGreaterThanMedium)
    );
  }

  selectIsProgressBarLoading() {
    return this.select(state => state.progressBarLoading);
  }

  selectToolbarHeight() {
    return this.select(state => state.toolbarHeight);
  }

  private _isWidthMediumOrGreater(size: MediaBreakpointsEnum) {
    switch (size) {
      case MediaBreakpointsEnum.Medium:
      case MediaBreakpointsEnum.Large:
      case MediaBreakpointsEnum.ExtraLarge:
        return true;
      default:
        return false;
    }
  }
}
