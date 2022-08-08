import { createSelector } from '@ngrx/store';

import { IHttpApiState, IHttpApiStateModel } from './http-api.interface';

const selectFeature = (state: IHttpApiState) => state.httpApi;

const ping = createSelector(selectFeature, (state: IHttpApiStateModel) => state.ping);

export const httpApiSelectors = {
  ping,
};
