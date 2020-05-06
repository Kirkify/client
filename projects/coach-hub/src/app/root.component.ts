import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from './state/web-socket/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ch-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, OnDestroy {

  private _subscriptions = new Subscription();

  constructor(
    private socketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.socketService.initialize();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
