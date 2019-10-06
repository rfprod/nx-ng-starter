import { Observable } from 'rxjs';

import { IActionPayload } from '@nx-ng-starter/shared-core/util';

import { Message } from '@nx-ng-starter/api-interface';

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
  cached(): void;
  request(): void;
}

export interface IHttpApiHandlers {
  ping: IHttpApiHandlersActions;
}

export interface IHttpApiInterface {
  ping(): Observable<Message>;
}
