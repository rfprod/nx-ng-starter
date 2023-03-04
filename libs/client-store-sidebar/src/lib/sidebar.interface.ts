import { InjectionToken } from '@angular/core';
import { IReducerConfig } from '@app/client-util-ngrx';
import { ActionReducer } from '@ngrx/store';

export interface ISidebarStateModel {
  sidebarOpen: boolean;
}

export interface ISidebarState {
  sidebar: ISidebarStateModel;
}

export const sidebarReducerConfig: IReducerConfig<keyof ISidebarState, ISidebarStateModel> = {
  featureName: 'sidebar',
  token: new InjectionToken<ActionReducer<ISidebarStateModel>>('sidebar reducer'),
  initialState: {
    sidebarOpen: false,
  },
};
