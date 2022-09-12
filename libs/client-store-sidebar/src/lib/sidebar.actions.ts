import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { featureName } from './sidebar.interface';

const open = createAction(actionType(featureName, 'open'), props<{ payload: { navigate: boolean } }>());

const close = createAction(actionType(featureName, 'close'), props<{ payload: { navigate: boolean } }>());

const toggle = createAction(actionType(featureName, 'toggle'));

export const sidebarActions = {
  open,
  close,
  toggle,
};
