import { createSelector } from '@ngrx/store';

import { ISidebarState, ISidebarStateModel } from './sidebar.interface';

const selectFeature = (state: ISidebarState) => state.sidebar;

const sidebarOpened = createSelector(selectFeature, (state: ISidebarStateModel) => state.sidebarOpened);

export const sidebarSelectors = {
  sidebarOpened,
};
