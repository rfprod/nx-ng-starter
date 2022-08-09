import { createSelector } from '@ngrx/store';

import { IHttpProgressState, IHttpProgressStateModel } from './http-progress.interface';

const selectFeature = (state: IHttpProgressState) => state.httpProgress;

const mainView = createSelector(selectFeature, (state: IHttpProgressStateModel) => state.mainView);
const sidebar = createSelector(selectFeature, (state: IHttpProgressStateModel) => state.sidebar);
const toaster = createSelector(selectFeature, (state: IHttpProgressStateModel) => state.toaster);

export const httpProgressSelectors = {
  mainView,
  sidebar,
  toaster,
};
