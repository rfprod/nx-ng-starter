import { Injectable, Provider } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { WebsocketApiService } from './websocket-api.service';
import { IWebsocketservice, IWebsocketStatePayload } from './websocket.interface';
import { websocketActions, WebsocketState } from './websocket.store';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService implements IWebsocketservice {
  public readonly events$ = this.store.select(WebsocketState.getEvents);

  public readonly users$ = this.store.select(WebsocketState.getUsers);

  public readonly state$ = this.store.select(WebsocketState.getState);

  constructor(private readonly store: Store, protected api: WebsocketApiService) {
    void this.api
      .connect()
      .pipe(
        concatMap(event => {
          const payload = {
            users: event.event === 'users' ? event.data : void 0,
            events: [event],
          };
          return this.setState(payload);
        }),
      )
      .subscribe();
  }

  public setState(payload: IWebsocketStatePayload): Observable<IWebsocketStatePayload> {
    return this.store.dispatch(new websocketActions.setState(payload));
  }

  public getData() {
    this.api.sendEvent('events');
  }
}

/**
 * Websocket service factory constructor.
 */
export type TWebsocketServiceFactoryConstructor = (
  store: Store,
  api: WebsocketApiService,
) => WebsocketService;

/**
 * Websocket service factory.
 */
export const websocketServiceFactory: TWebsocketServiceFactoryConstructor = (
  store: Store,
  api: WebsocketApiService,
) => {
  return new WebsocketService(store, api);
};

/**
 * Websocket service provider.
 */
export const websocketServiceProvider: Provider = {
  provide: WebsocketService,
  useFactory: websocketServiceFactory,
  deps: [Store, WebsocketApiService],
};
