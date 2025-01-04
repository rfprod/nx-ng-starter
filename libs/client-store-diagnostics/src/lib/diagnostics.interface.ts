import { InjectionToken } from '@angular/core';
import type { IReducerConfig } from '@app/client-util-ngrx';
import type { ActionReducer } from '@ngrx/store';
import type { WebSocketSubjectConfig } from 'rxjs/webSocket';

export interface IWebsocketRequestEvent {
  event: string;
}

export interface IWebsocketResponseEvent<T = unknown> {
  event: string;
  data: T;
}

export type TDiagnosticData = Record<string, string | number>;

/** Diagnostics state model. */
export interface IDiagnosticsStateModel {
  users: number;
  events: Array<IWebsocketResponseEvent<TDiagnosticData[]>>;
  staticData: TDiagnosticData[];
  dynamicData: TDiagnosticData[];
}

/** Diagnostics state. */
export interface IDiagnosticsState {
  diagnostics: IDiagnosticsStateModel;
}

export interface IWebsocketConfig extends WebSocketSubjectConfig<IWebsocketRequestEvent> {
  url: string;
}

export type TWsConfigToken = InjectionToken<IWebsocketConfig>;

export const WS_CONFIG: TWsConfigToken = new InjectionToken<IWebsocketConfig>('WS_CONFIG');

/** Diagnostics reducer configuration. */
export const diagnosticsReducerConfig: IReducerConfig<keyof IDiagnosticsState, IDiagnosticsStateModel> = {
  featureName: 'diagnostics',
  token: new InjectionToken<ActionReducer<IDiagnosticsStateModel>>('diagnostics reducer'),
  initialState: {
    users: 0,
    events: [],
    dynamicData: [],
    staticData: [],
  },
};
