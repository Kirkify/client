import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from './state/web-socket/web-socket.service';
import { Subscription } from 'rxjs';
import { InitialStateService } from './services/initial-state/initial-state.service';

@Component({
  selector: 'ch-root',
  templateUrl: './root.component.html',
  styleUrls: [ './root.component.scss' ]
})
export class RootComponent implements OnInit, OnDestroy {

  private _subscriptions = new Subscription();

  constructor(
    private socketService: WebSocketService,
    private initialStateService: InitialStateService
  ) {
  }

  ngOnInit(): void {
    this.socketService.init();

    this._subscriptions.add(
      this.initialStateService.fetchInitialState().subscribe()
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
