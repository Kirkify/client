import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { UiQuery } from '../../../../state/ui/ui.query';
import { UiService } from '../../../../state/ui/ui.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ALL_MEDIA_BREAKPOINTS } from '../../../../state/ui/models/media-breakpoints.enum';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ProgressBarQuery } from '../../../../state/progress-bar/progress-bar.query';
import { ProgressBarService } from '../../../../state/progress-bar/progress-bar.service';

@Component({
  selector: 'ch-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: [ './app-container.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppContainerComponent implements OnInit, OnDestroy {
  assetUrl = environment.assets_url;

  isProgressBarLoading$ = this.progressBarQuery.selectIsProgressBarLoading$;
  progressBarHeight$ = this.progressBarQuery.selectProgressBarHeight$;
  toolbarHeight$ = this.uiQuery.selectToolbarHeight$;
  isSideNavOpen$ = this.uiQuery.selectIsSideNavOpen$;

  private _subscriptions = new Subscription();

  constructor(
    private uiQuery: UiQuery,
    private uiService: UiService,
    private progressBarQuery: ProgressBarQuery,
    private service: ProgressBarService,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit(): void {
    // We can update ui based screen width state by supplying an array of CSS media queries
    this._subscriptions.add(
      this.breakpointObserver.observe(ALL_MEDIA_BREAKPOINTS).pipe(
        tap(result => {
          // If a match was found
          if (result.matches) {
            // Sometimes 2 breakpoints can be returned as a match when changing the screen width quickly
            // Find will only return the first
            const matchedBreakpoint = Object.keys(result.breakpoints).find(key => result.breakpoints[ key ] === true);
            this.uiService.updateMediaWidthBreakpoint(matchedBreakpoint);
          }
        })
      ).subscribe()
    );

    this._subscriptions.add(
      this.uiQuery.selectIsScreenWidthMediumOrGreater$.pipe(
        tap(isGreater => {
          if (isGreater) {
            this.uiService.setToolbarHeightToLarge();
          } else {
            this.uiService.setToolbarHeightToSmall();
          }
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  openSideNav() {
    this.uiService.openSideNav();
  }

  closeSideNav() {
    this.uiService.closeSideNav();
  }
}
