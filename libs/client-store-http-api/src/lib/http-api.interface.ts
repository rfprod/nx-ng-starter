export interface IPingResponse {
  message: string;
}

export interface IHttpApiStateModel {
  ping: string;
}

export interface IHttpApiState {
  httpApi: IHttpApiStateModel;
}

export const featureName: keyof IHttpApiState = 'httpApi';
