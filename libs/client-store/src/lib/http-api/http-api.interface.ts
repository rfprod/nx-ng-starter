import { StateToken } from '@ngxs/store';

export interface IAppHttpApiState {
  ping: string;
}

export interface IPingResponse {
  message: string;
}

export interface IPingPayload {
  ping?: string;
}

export const httpApiInitialState = {
  ping: '',
};

export const HTTP_API_STATE_TOKEN = new StateToken<IAppHttpApiState>('httpApi');
