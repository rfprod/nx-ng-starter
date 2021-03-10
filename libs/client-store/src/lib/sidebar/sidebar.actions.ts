import { actionPayloadConstructor } from '@nx-ng-starter/client-util';

import { SIDEBAR_STATE_TOKEN } from './sidebar.interface';

const createAction = actionPayloadConstructor(SIDEBAR_STATE_TOKEN.getName());

export const openSidebar = createAction('open');

export const closeSidebar = createAction('close');
