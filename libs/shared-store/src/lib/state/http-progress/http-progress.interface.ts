import { IActionPayload } from '@nx-ng-starter/shared-util';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

export interface IAppHttpProgressStateModel {
  mainView: boolean;
}

export interface IAppHttpProgressStatePayload {
  mainView?: boolean;
}

export type THttpProgressPayload = IActionPayload<IAppHttpProgressStatePayload>;

export interface IHttpProgressObservableOutput {
  all$: Observable<IAppHttpProgressStateModel>;
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
