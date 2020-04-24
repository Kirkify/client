import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { SocketMessageInterface } from './models/socket-message.interface';

export interface WebSocketState {
  socketMessage: SocketMessageInterface;
}

function createInitialState(): WebSocketState {
  return {
    socketMessage: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'webSocketStore' })
export class WebSocketStore extends Store<WebSocketState> {
  constructor() {
    super(createInitialState());
  }
}
