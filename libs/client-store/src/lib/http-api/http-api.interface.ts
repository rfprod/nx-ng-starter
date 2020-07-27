import { IActionPayload } from '@nx-ng-starter/client-util';
import { Observable } from 'rxjs';

export interface IPingResponse {
  message: string;
}

export interface IAppHttpApiStateModel {
  ping: string;
}

export interface IAppHttpApiStatePayload {
  ping?: string;
}

export type THttpApiPayload = IActionPayload<IAppHttpApiStatePayload>;

export interface IHttpApiObservableOutput {
  all$: Observable<IAppHttpApiStateModel>;
  ping$: Observable<string>;
}

export interface IHttpApiHandlersActions {
  cached(): Observable<string>;
  request(): Observable<IPingResponse | string>;
}

export interface IHttpApiHandlers {
  ping: IHttpApiHandlersActions;
}

export interface IHttpApiInterface {
  ping(): Observable<IPingResponse | string>;
}
