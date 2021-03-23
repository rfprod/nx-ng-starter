import { actionPayloadConstructor } from '@nx-ng-starter/client-util';

import { SIDEBAR_STATE_TOKEN } from './sidebar.interface';

const createAction = actionPayloadConstructor(SIDEBAR_STATE_TOKEN.getName());

const openSidebar = createAction('open');

const closeSidebar = createAction('close');

const toggleSidebar = createAction('toggle');

export const sidebarActions = {
  openSidebar,
  closeSidebar,
  toggleSidebar,
};
