import { InjectionToken } from '@angular/core';
import type { IReducerConfig } from '@app/client-util-ngrx';
import type { ActionReducer } from '@ngrx/store';

/** Sidebar state model. */
export interface ISidebarStateModel {
  sidebarOpen: boolean;
}

/** Sidebar state. */
export interface ISidebarState {
  sidebar: ISidebarStateModel;
}

/** Sidebar reducer configuration. */
export const sidebarReducerConfig: IReducerConfig<keyof ISidebarState, ISidebarStateModel> = {
  featureName: 'sidebar',
  token: new InjectionToken<ActionReducer<ISidebarStateModel>>('sidebar reducer'),
  initialState: {
    sidebarOpen: false,
  },
};
