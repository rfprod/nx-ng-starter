import { InjectionToken } from '@angular/core';
import type { IReducerConfig } from '@app/client-util-ngrx';
import type { ActionReducer } from '@ngrx/store';

export interface IPingResponse {
  message: string;
}

/** HttpApi state model. */
export interface IHttpApiStateModel {
  ping: string;
}

/** HttpApi state. */
export interface IHttpApiState {
  httpApi: IHttpApiStateModel;
}

/** HttpApi reducer configuration. */
export const httpApiReducerConfig: IReducerConfig<keyof IHttpApiState, IHttpApiStateModel> = {
  featureName: 'httpApi',
  token: new InjectionToken<ActionReducer<IHttpApiStateModel>>('httpApi reducer'),
  initialState: {
    ping: '',
  },
};
