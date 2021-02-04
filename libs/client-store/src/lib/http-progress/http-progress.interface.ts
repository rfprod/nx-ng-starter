import { StateToken } from '@ngxs/store';
import { IActionPayload } from '@nx-ng-starter/client-util';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

export interface IAppHttpProgressState {
  mainView: boolean;
}

export interface IAppHttpProgressStatePayload {
  mainView?: boolean;
}

export const httpProgressInitialState = {
  mainView: false,
};

export const HTTP_PROGRESS_STATE_TOKEN = new StateToken<IAppHttpProgressState>('httpProgress');

export type THttpProgressPayload = IActionPayload<IAppHttpProgressStatePayload>;

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
