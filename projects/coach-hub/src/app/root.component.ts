import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './state/web-socket/web-socket.service';

@Component({
  selector: 'ch-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(
    private socketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.socketService.initialize();
  }
}
