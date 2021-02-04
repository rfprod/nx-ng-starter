import { StateToken } from '@ngxs/store';
import { IActionPayload } from '@nx-ng-starter/client-util';
import { Observable } from 'rxjs';

export interface IPingResponse {
  message: string;
}

export interface IAppHttpApiState {
  ping: string;
}

export interface IAppHttpApiStatePayload {
  ping?: string;
}

export const httpApiInitialState = {
  ping: '',
};

export const HTTP_API_STATE_TOKEN = new StateToken<IAppHttpApiState>('httpApi');

export type THttpApiPayload = IActionPayload<IAppHttpApiStatePayload>;

export interface IHttpApiHandlersActions {
  cached(): Observable<string>;
  request(): Observable<IPingResponse | string>;
}
