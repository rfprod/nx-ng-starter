import { createSelector } from '@ngrx/store';

import { IRouterState } from './router.interface';

const selectFeature = (state: IRouterState) => state.router;

const data = createSelector(selectFeature, state => state.state.data);
const queryParams = createSelector(selectFeature, state => state.state.queryParams);
const params = createSelector(selectFeature, state => state.state.params);
const url = createSelector(selectFeature, state => state.state.url);

export const routerSelectors = {
  data,
  queryParams,
  params,
  url,
};
