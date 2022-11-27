import { actionType } from '@app/client-util-ngrx';
import { createAction } from '@ngrx/store';

import { featureName } from './chatbot.interface';

const open = createAction(actionType(featureName, 'open'));

const close = createAction(actionType(featureName, 'close'));

export const chatbotActions = {
  open,
  close,
};
