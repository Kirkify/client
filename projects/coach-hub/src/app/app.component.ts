import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './state/web-socket/web-socket.service';

@Component({
  selector: 'ch-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private socketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.socketService.initialize();
  }
}
