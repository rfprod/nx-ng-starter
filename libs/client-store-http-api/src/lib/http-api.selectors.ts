import { createSelector } from '@ngrx/store';

import type { IHttpApiState, IHttpApiStateModel } from './http-api.interface';

const selectFeature = (state: IHttpApiState) => state.httpApi;

export const httpApiSelector = {
  ping: createSelector(selectFeature, (state: IHttpApiStateModel) => state.ping),
};
