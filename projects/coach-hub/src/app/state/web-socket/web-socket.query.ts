import { filterNil, Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { WebSocketState, WebSocketStore } from './web-socket.store';

@Injectable({ providedIn: 'root' })
export class WebSocketQuery extends Query<WebSocketState> {
  constructor(protected store: WebSocketStore) {
    super(store);
  }

  onSocketMessage$ = this.select(store => store.socketMessage).pipe(
    filterNil
  );
}
