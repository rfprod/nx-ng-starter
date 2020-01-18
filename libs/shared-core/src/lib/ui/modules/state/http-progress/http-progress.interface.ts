import { IActionPayload } from '@nx-ng-starter/shared-core/util';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';

export interface IHttpProgressStateModel {
  mainView: boolean;
}

export interface IHttpProgressStatePayload {
  mainView?: boolean;
}

export type HttpProgressPayload = IActionPayload<IHttpProgressStatePayload>;

export interface IHttpProgressObservableOutput {
  all$: Observable<IHttpProgressStateModel>;
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
