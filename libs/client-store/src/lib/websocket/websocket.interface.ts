import { InjectionToken } from '@angular/core';
import { IActionPayload } from '@nx-ng-starter/client-util';
import { Observable } from 'rxjs';
import { WebSocketSubjectConfig } from 'rxjs/webSocket';

export interface IWebsocketRequestEvent {
  event: string;
}

export interface IWebsocketResponseEvent<T = unknown> {
  event: string;
  data: T;
}

export interface IAppWebsocketStateModel {
  users: number;
  events: IWebsocketResponseEvent[];
}

export interface IAppWebsocketStatePayload {
  users?: number;
  events?: IWebsocketResponseEvent[];
}

export type TWebsocketPayload = IActionPayload<IAppWebsocketStatePayload>;

export interface IWebsocketservice {
  events$: Observable<IWebsocketResponseEvent[]>;
  users$: Observable<number>;
  state$: Observable<IAppWebsocketStateModel>;
  setState(payload: IAppWebsocketStatePayload): void;
}

export interface IWebsocketConfig extends WebSocketSubjectConfig<IWebsocketRequestEvent> {
  url: string;
}

export type TWsConfigToken = InjectionToken<Window>;

export const WS_CONFIG: TWsConfigToken = new InjectionToken<IWebsocketConfig>('WS_CONFIG');
