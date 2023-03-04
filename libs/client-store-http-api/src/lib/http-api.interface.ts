import { InjectionToken } from '@angular/core';
import { IReducerConfig } from '@app/client-util-ngrx';
import { ActionReducer } from '@ngrx/store';

export interface IPingResponse {
  message: string;
}

export interface IHttpApiStateModel {
  ping: string;
}

export interface IHttpApiState {
  httpApi: IHttpApiStateModel;
}

export const httpApiReducerConfig: IReducerConfig<keyof IHttpApiState, IHttpApiStateModel> = {
  featureName: 'httpApi',
  token: new InjectionToken<ActionReducer<IHttpApiStateModel>>('httpApi reducer'),
  initialState: {
    ping: '',
  },
};
