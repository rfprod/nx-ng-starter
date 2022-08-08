import { createAction, props } from '@ngrx/store';

import { featureName } from './sidebar.interface';

const type = (name: string) => `[${featureName}] ${name}`;

const open = createAction(type('open'), props<{ payload: { navigate: boolean } }>());

const close = createAction(type('close'), props<{ payload: { navigate: boolean } }>());

const toggle = createAction(type('toggle'));

export const sidebarActions = {
  open,
  close,
  toggle,
};
