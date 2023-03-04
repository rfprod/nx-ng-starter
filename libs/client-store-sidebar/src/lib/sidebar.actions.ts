import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { sidebarReducerConfig } from './sidebar.interface';

const open = createAction(actionType(sidebarReducerConfig.featureName, 'open'), props<{ payload: { navigate: boolean } }>());

const close = createAction(actionType(sidebarReducerConfig.featureName, 'close'), props<{ payload: { navigate: boolean } }>());

const toggle = createAction(actionType(sidebarReducerConfig.featureName, 'toggle'));

export const sidebarActions = {
  open,
  close,
  toggle,
};
