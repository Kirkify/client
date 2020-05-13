import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from './state/web-socket/web-socket.service';
import { Subscription } from 'rxjs';
import { InitialStateService } from './services/initial-state/initial-state.service';

@Component({
  selector: 'ch-root',
  templateUrl: './root.component.html',
  styleUrls: [ './root.component.scss' ]
})
export class RootComponent implements OnInit {

  constructor(
    private socketService: WebSocketService,
    private initialStateService: InitialStateService
  ) {
  }

  ngOnInit(): void {
    this.socketService.init();
    this.initialStateService.init();
  }
}
