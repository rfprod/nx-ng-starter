import { createSelector } from '@ngrx/store';

import type { IRouterState } from './router.interface';

const selectFeature = (state: IRouterState) => state.router;

export const routerSelector = {
  data: createSelector(selectFeature, state => state.state.data),
  queryParams: createSelector(selectFeature, state => state.state.queryParams),
  params: createSelector(selectFeature, state => state.state.params),
  url: createSelector(selectFeature, state => state.state.url),
};
