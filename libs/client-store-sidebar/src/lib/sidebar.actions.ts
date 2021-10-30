import { actionPayloadConstructor } from '@app/client-util';

import { SIDEBAR_STATE_TOKEN, TSidebarPayload } from './sidebar.interface';

const createAction = actionPayloadConstructor(SIDEBAR_STATE_TOKEN.getName());

const openSidebar = createAction('open');

const closeSidebar = createAction('close');

const toggleSidebar = createAction('toggle');

const setState = createAction<TSidebarPayload>('set state');

export const sidebarActions = {
  openSidebar,
  closeSidebar,
  toggleSidebar,
  setState,
};
