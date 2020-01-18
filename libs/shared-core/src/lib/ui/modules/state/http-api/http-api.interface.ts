import { Message } from '@nx-ng-starter/api-interface';
import { IActionPayload } from '@nx-ng-starter/shared-core/util';
import { Observable } from 'rxjs';

export interface IHttpApiStateModel {
  ping: string;
}

export interface IHttpApiStatePayload {
  ping?: string;
}

export type HttpApiPayload = IActionPayload<IHttpApiStatePayload>;

export interface IHttpApiObservableOutput {
  all$: Observable<IHttpApiStateModel>;
  ping$: Observable<string>;
}

export interface IHttpApiHandlersActions {
  cached(): Observable<string>;
  request(): Observable<Message>;
}

export interface IHttpApiHandlers {
  ping: IHttpApiHandlersActions;
}

export interface IHttpApiInterface {
  ping(): Observable<Message>;
}
