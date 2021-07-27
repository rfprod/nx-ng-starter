import { InjectionToken } from '@angular/core';
import { IActionPayload } from '@app/client-util';
import { StateToken } from '@ngxs/store';
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

export const websocketInitialState = {
  users: 0,
  events: [],
};

export const WEBSOCKET_STATE_TOKEN = new StateToken<IAppWebsocketStateModel>('websocket');

export interface IAppWebsocketStatePayload {
  users?: number;
  events?: IWebsocketResponseEvent[];
}

export type TWebsocketPayload = IActionPayload<IAppWebsocketStatePayload>;

export interface IWebsocketConfig extends WebSocketSubjectConfig<IWebsocketRequestEvent> {
  url: string;
}

export type TWsConfigToken = InjectionToken<Window>;

export const WS_CONFIG: TWsConfigToken = new InjectionToken<IWebsocketConfig>('WS_CONFIG');
