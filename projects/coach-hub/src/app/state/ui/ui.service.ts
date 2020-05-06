import { Injectable } from '@angular/core';
import { ToolbarHeightEnum } from './models/toolbar-height.enum';
import { MediaBreakpointsEnum } from './models/media-breakpoints.enum';
import { UiStore } from './ui.store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { guid } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class UiService {

  constructor(
    private uiStore: UiStore,
    // private snackBar: MatSnackBar,
  ) {
  }

  showSnackbar(msg: string) {
    // this.snackBar.open(msg, 'close', {duration: 6000});
  }

  updateMediaWidthBreakpoint(value: string) {
    let breakpoint;

    switch (value) {
      case MediaBreakpointsEnum.ExtraSmall:
        breakpoint = MediaBreakpointsEnum.ExtraSmall;
        break;
      case MediaBreakpointsEnum.Small:
        breakpoint = MediaBreakpointsEnum.Small;
        break;
      case MediaBreakpointsEnum.Medium:
        breakpoint = MediaBreakpointsEnum.Medium;
        break;
      case MediaBreakpointsEnum.Large:
        breakpoint = MediaBreakpointsEnum.Large;
        break;
      case MediaBreakpointsEnum.ExtraLarge:
        breakpoint = MediaBreakpointsEnum.ExtraLarge;
        break;
    }

    if (breakpoint) {
      this.uiStore.update({
        screenWidth: breakpoint
      });
    }
  }

  closeSideNav() {
    this.uiStore.update({ sideNavOpened: false });
  }

  openSideNav() {
    this.uiStore.update({ sideNavOpened: true });
  }

  setToolbarHeightToSmall() {
    this.uiStore.update({ toolbarHeight: ToolbarHeightEnum.Small });
  }

  setToolbarHeightToLarge() {
    this.uiStore.update({ toolbarHeight: ToolbarHeightEnum.Large });
  }
}
