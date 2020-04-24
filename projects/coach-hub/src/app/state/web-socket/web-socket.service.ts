import { Injectable } from '@angular/core';
import { EventsEnum } from './models/events.enum';
import { ChannelsEnum } from './models/channels.enum';
import { EventListenersEnum } from './models/event-listeners.enum';
import { AuthenticationService } from '../authentication/authentication.service';
import Echo from 'laravel-echo';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SocketMessageInterface } from './models/socket-message.interface';
import { AuthenticationQuery } from '../authentication/authentication.query';
import { WebSocketStore } from './web-socket.store';
import { filterNil } from '@datorama/akita';
import { MessageCreatedResponseInterface } from '../../modules/messaging/services/models/message-created-response.interface';
import { environment } from '../../../environments/environment';
import { injectScript } from '../../shared/helpers/script-injector.helper';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private _echo: Echo;
  private _hasScriptBeenInjected = false;
  private _hasScriptLoaded = false;
  private _lastAccessToken = null;
  private _lastUserId = null;

  constructor(
    // private store: UsersOnlineStore,
    private authService: AuthenticationService,
    private query: AuthenticationQuery,
    private webSocketStore: WebSocketStore) {
  }

  initialize() {
    this.query.selectIsAuthenticated$.pipe(
      mergeMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.query.selectAccessTokenString$.pipe(
            filterNil,
            take(1),
            tap(token => {
             this._init(token);
            })
          );
        } else {
          return of(null).pipe(
            tap(() => {
              this._disconnectEcho();
            })
          );
        }
      })
    ).subscribe();
  }

  private _privateSocketMessage(ev: SocketMessageInterface) {
    this.webSocketStore.update({ socketMessage: ev });
  }

  private _disconnectEcho() {
    if (this._echo) {
      this._echo.disconnect();
    }
  }

  private _init(token: string) {
    const userId = this.query.getUserId();
    if (this._echo && (this._lastAccessToken !== token && this._lastUserId !== userId)) {
      this._disconnectEcho();
      // TODO: Instead of disconnected then recreating a new instance of Echo, we
      // should find a way to just update the Auth headers
      this._startEcho(token, userId);
    } else {
      if (!this._hasScriptBeenInjected) {
        injectScript(environment.ws_script)
          .then(() => {
            console.log('Script loaded!');
            this._hasScriptLoaded = true;
            this._startEcho(token, userId);
          }).catch(error => {
          console.log(error);
        });
        this._hasScriptBeenInjected = true;
      } else if (this._hasScriptLoaded) {
        this._startEcho(token, userId);
      }
    }
  }

  private _startEcho(token: string, userId: number) {
    this._lastAccessToken = token;
    this._lastUserId = userId;

    this._echo = new Echo({
      broadcaster: 'socket.io',
      host: environment.is_docker ? environment.url : environment.dev_url,
      path: environment.is_docker ? '/ws/socket.io' : '/socket.io',
      auth: {
        headers: {
          Authorization: token
        }
      },
      rejectUnauthorized: false
    });
    // Join the private channel created solely for the user
    this._echo.private(ChannelsEnum.PrivateDefault + userId)
      .listen(EventListenersEnum.Default, this._privateSocketMessage.bind(this));

    this._echo.join(ChannelsEnum.PresenceDefault)
      .here(users => {
        console.log('All users here');
        console.log(users);
        // this.store.set(users);
      })
      .joining(user => {
        console.log('Joining');
        console.log(user);
        // this.store.add(user);
      })
      .leaving(user => {
        console.log('Leaving');
        console.log(user);
        // this.store.remove(user.id);
      });
    // this._echo[ChannelTypeEnum.Private](ChannelsEnum.PrivateDefault + userId)
    // .listen(EventListenersEnum.PrivateDefault, this._socketMessage.bind(this));
  }
}
