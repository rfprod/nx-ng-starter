import { InjectionToken } from '@angular/core';
import { IActionPayload } from '@nx-ng-starter/shared-util';
import { Observable } from 'rxjs';
import { WebSocketSubjectConfig } from 'rxjs/webSocket';

export interface IWebsocketRequestEvent {
  event: string;
}

export interface IWebsocketResponseEvent<T = unknown> {
  event: string;
  data: T;
}

export interface IWebsocketStateModel {
  users: number;
  events: IWebsocketResponseEvent[];
}

export interface IWebsocketStatePayload {
  users?: number;
  events?: IWebsocketResponseEvent[];
}

export type TWebsocketPayload = IActionPayload<IWebsocketStatePayload>;

export interface IWebsocketservice {
  events$: Observable<IWebsocketResponseEvent[]>;
  users$: Observable<number>;
  state$: Observable<IWebsocketStateModel>;
  setState(payload: IWebsocketStatePayload): void;
}

export interface IWebsocketConfig extends WebSocketSubjectConfig<IWebsocketRequestEvent> {
  url: string;
}

export type TWsConfigToken = InjectionToken<Window>;

export const WS_CONFIG: TWsConfigToken = new InjectionToken<IWebsocketConfig>('WS_CONFIG');
