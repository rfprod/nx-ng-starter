import { createSelector } from '@ngrx/store';

import { IHttpProgressState, IHttpProgressStateModel } from './http-progress.interface';

const selectFeature = (state: IHttpProgressState) => state.httpProgress;

export const httpProgressSelector = {
  mainView: createSelector(selectFeature, (state: IHttpProgressStateModel) => state.mainView),
  sidebar: createSelector(selectFeature, (state: IHttpProgressStateModel) => state.sidebar),
  toaster: createSelector(selectFeature, (state: IHttpProgressStateModel) => state.toaster),
};
