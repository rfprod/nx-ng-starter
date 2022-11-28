import { createSelector } from '@ngrx/store';

import { ISidebarState, ISidebarStateModel } from './sidebar.interface';

const selectFeature = (state: ISidebarState) => state.sidebar;

const sidebarOpen = createSelector(selectFeature, (state: ISidebarStateModel) => state.sidebarOpen);

export const sidebarSelectors = {
  sidebarOpen,
};
