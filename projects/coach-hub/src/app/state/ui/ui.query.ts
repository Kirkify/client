import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UiStore, UiState } from './ui.store';
import { MediaBreakpointsEnum } from './models/media-breakpoints.enum';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProgressBarQuery } from '../progress-bar/progress-bar.query';

@Injectable({ providedIn: 'root' })
export class UiQuery extends Query<UiState> {

  constructor(
    protected store: UiStore,
    private progressBarQuery: ProgressBarQuery
  ) {
    super(store);
  }

  /**
   * This value is equal to the toolbar height plus the height of the progress bar
   */
  selectToolbarHeight$ = this.select(state => state.toolbarHeight);

  selectFullToolbarHeight$ = combineLatest([
    this.selectToolbarHeight$,
    this.progressBarQuery.selectProgressBarHeight$
  ]).pipe(
    map(([ toolbarHeight, progressBarHeight ]) => toolbarHeight + progressBarHeight)
  );

  selectIsScreenWidthMediumOrGreater$ = this.select(state => state.screenWidth).pipe(
    map(width => this._isWidthMediumOrGreater(width))
  );

  selectIsSideNavOpen$ = this.select(state => state.sideNavOpened);

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
