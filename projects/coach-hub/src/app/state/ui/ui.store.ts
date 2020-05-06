import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { MediaBreakpointsEnum } from './models/media-breakpoints.enum';
import { ToolbarHeightEnum } from './models/toolbar-height.enum';

export interface UiState {
  toolbarHeight: ToolbarHeightEnum;
  screenWidth: MediaBreakpointsEnum;
  sideNavOpened: boolean;
}

export function createInitialState(): UiState {
  return {
    toolbarHeight: ToolbarHeightEnum.Large,
    screenWidth: MediaBreakpointsEnum.Small,
    sideNavOpened: false
  };
}

export const UI_STORE_NAME = 'ui';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: UI_STORE_NAME })
export class UiStore extends Store<UiState> {

  constructor() {
    super(createInitialState());
  }
}

