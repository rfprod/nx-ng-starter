import { InjectionToken } from '@angular/core';
import { TToastType } from '@app/client-util';
import { IReducerConfig } from '@app/client-util-ngrx';
import { ActionReducer } from '@ngrx/store';
import { MonoTypeOperatorFunction } from 'rxjs';

export interface IViewProgress {
  counter: number;
  loading: boolean;
}

export interface IHttpProgressStateModel {
  mainView: IViewProgress;
  sidebar: IViewProgress;
  toaster: {
    message: string;
    type: TToastType;
    duration?: number;
  };
}

export interface IHttpProgressState {
  httpProgress: IHttpProgressStateModel;
}

export interface IHttpProgressPayload {
  mainView?: boolean;
  sidebar?: boolean;
}

export interface IShowToastPayload {
  message: string;
  type: TToastType;
  duration?: number;
}

export interface IHttpProgressHandler {
  start(): void;
  stop(): void;
  tapStopperObservable<T>(): MonoTypeOperatorFunction<T>;
}

export const httpProgressReducerConfig: IReducerConfig<keyof IHttpProgressState, IHttpProgressStateModel> = {
  featureName: 'httpProgress',
  token: new InjectionToken<ActionReducer<IHttpProgressStateModel>>('httpProgress reducer'),
  initialState: {
    mainView: {
      counter: 0,
      loading: false,
    },
    sidebar: {
      counter: 0,
      loading: false,
    },
    toaster: {
      message: '',
      type: 'primary',
      duration: void 0,
    },
  },
};
