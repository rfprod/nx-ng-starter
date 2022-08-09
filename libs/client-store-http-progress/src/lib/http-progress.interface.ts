import { TToastType } from '@app/client-util';
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

export const featureName: keyof IHttpProgressState = 'httpProgress';

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
