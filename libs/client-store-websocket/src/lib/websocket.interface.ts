import { InjectionToken } from '@angular/core';
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
  events: IWebsocketResponseEvent<string | number | undefined>[];
}

export interface IWebsocketState {
  websocket: IWebsocketStateModel;
}

export interface IWebsocketConfig extends WebSocketSubjectConfig<IWebsocketRequestEvent> {
  url: string;
}

export type TWsConfigToken = InjectionToken<IWebsocketConfig>;

export const WS_CONFIG: TWsConfigToken = new InjectionToken<IWebsocketConfig>('WS_CONFIG');

export const featureName: keyof IWebsocketState = 'websocket';
