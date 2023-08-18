import { createSelector } from '@ngrx/store';

import { ISidebarState, ISidebarStateModel } from './sidebar.interface';

const selectFeature = (state: ISidebarState) => state.sidebar;

export const sidebarSelector = {
  sidebarOpen: createSelector(selectFeature, (state: ISidebarStateModel) => state.sidebarOpen),
};
