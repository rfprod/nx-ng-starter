import { StateToken } from '@ngxs/store';
import { IActionPayload, TToastType } from '@nx-ng-starter/client-util';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

export interface IAppHttpProgressState {
  mainView: {
    counter: number;
    loading: boolean;
  };
}

export interface IAppHttpProgressStatePayload {
  mainView?: boolean;
}

export const httpProgressInitialState = {
  mainView: {
    counter: 0,
    loading: false,
  },
};

export const HTTP_PROGRESS_STATE_TOKEN = new StateToken<IAppHttpProgressState>('httpProgress');

export type THttpProgressPayload = IActionPayload<IAppHttpProgressStatePayload>;

export interface IShowToastPayload {
  message: string;
  type: TToastType;
  duration?: number;
}

export type TShowToastPayload = IActionPayload<IShowToastPayload>;

export interface IHttpProgressObservableOutput {
  all$: Observable<IAppHttpProgressState>;
  mainView$: Observable<boolean>;
}

export interface IHttpProgressHandlersActions {
  start(): void;
  stop(): void;
  tapStopperObservable<T>(): MonoTypeOperatorFunction<T>;
}

export interface IHttpProgressHandlers {
  mainView: IHttpProgressHandlersActions;
}
