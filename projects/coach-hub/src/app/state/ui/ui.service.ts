import { Injectable } from '@angular/core';
import { ToolbarHeightEnum } from './models/toolbar-height.enum';
import { MediaBreakpointsEnum } from './models/media-breakpoints.enum';
import { UiStore } from './ui.store';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  updateProgressBarStatus(value: boolean) {
    this.uiStore.update({
      progressBarLoading: value
    });
  }

  updateToolbarHeight(value: ToolbarHeightEnum) {
    this.uiStore.update({
      toolbarHeight: value
    });
  }

  updateAppContainerOverflow(hideOverflow: boolean) {
    this.uiStore.update({
      hideAppOverflow: hideOverflow
    });
  }
}
