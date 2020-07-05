import { Inject, Injectable, Provider } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WebSocketSubject } from 'rxjs/webSocket';

import {
  IWebsocketConfig,
  IWebsocketRequestEvent,
  IWebsocketResponseEvent,
  WS_CONFIG,
} from './websocket.interface';

/**
 * Websocket Service.
 */
@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class WebsocketApiService {
  private readonly websocket$: WebSocketSubject<IWebsocketRequestEvent> = new WebSocketSubject(
    this.wsConfig,
  );

  constructor(@Inject(WS_CONFIG) private readonly wsConfig: IWebsocketConfig) {}

  public connect() {
    return this.websocket$.pipe(
      untilDestroyed(this),
      catchError((error: Event, caught: Observable<IWebsocketRequestEvent>) => {
        // eslint-disable-next-line no-console
        console.error('error', error);
        return of();
      }),
    ) as Observable<IWebsocketResponseEvent<number>>;
  }

  public sendEvent(eventType: 'events') {
    const event = { event: eventType };
    this.websocket$.next(event);
  }
}

/**
 * Websocket api service factory constructor.
 */
export type TWebsocketApiServiceFactoryConstructor = (
  config: IWebsocketConfig,
) => WebsocketApiService;

/**
 * Websocket api service factory.
 */
export const websocketApiServiceFactory: TWebsocketApiServiceFactoryConstructor = (
  config: IWebsocketConfig,
) => {
  return new WebsocketApiService(config);
};

/**
 * Websocket api service provider.
 */
export const websocketApiServiceProvider: Provider = {
  provide: WebsocketApiService,
  useFactory: websocketApiServiceFactory,
  deps: [WS_CONFIG],
};
