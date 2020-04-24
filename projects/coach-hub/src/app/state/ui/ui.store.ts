import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { MediaBreakpointsEnum } from './models/media-breakpoints.enum';

export interface UiState {
  progressBarLoading: boolean;
  toolbarHeight: number;
  screenWidth: MediaBreakpointsEnum;
  hideAppOverflow: boolean;
}

export function createInitialState(): UiState {
  return {
    progressBarLoading: false,
    toolbarHeight: 60,
    screenWidth: MediaBreakpointsEnum.Small,
    hideAppOverflow: false
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ui' })
export class UiStore extends Store<UiState> {

  constructor() {
    super(createInitialState());
  }

}

