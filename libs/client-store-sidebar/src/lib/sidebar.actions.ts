import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { sidebarReducerConfig } from './sidebar.interface';

export const sidebarAction = {
  open: createAction(actionType(sidebarReducerConfig.featureName, 'open'), props<{ payload: { navigate: boolean } }>()),
  close: createAction(actionType(sidebarReducerConfig.featureName, 'close'), props<{ payload: { navigate: boolean } }>()),
  toggle: createAction(actionType(sidebarReducerConfig.featureName, 'toggle')),
};
