import { IActionPayload, Message } from '@nx-ng-starter/shared-util';
import { Observable } from 'rxjs';

export interface IHttpApiStateModel {
  ping: string;
}

export interface IHttpApiStatePayload {
  ping?: string;
}

export type THttpApiPayload = IActionPayload<IHttpApiStatePayload>;

export interface IHttpApiObservableOutput {
  all$: Observable<IHttpApiStateModel>;
  ping$: Observable<string>;
}

export interface IHttpApiHandlersActions {
  cached(): Observable<string>;
  request(): Observable<Message | string>;
}

export interface IHttpApiHandlers {
  ping: IHttpApiHandlersActions;
}

export interface IHttpApiInterface {
  ping(): Observable<Message | string>;
}
