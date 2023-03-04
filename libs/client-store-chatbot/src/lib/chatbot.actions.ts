import { actionType } from '@app/client-util-ngrx';
import { createAction } from '@ngrx/store';

import { chatbotReducerConfig } from './chatbot.interface';

const open = createAction(actionType(chatbotReducerConfig.featureName, 'open'));

const close = createAction(actionType(chatbotReducerConfig.featureName, 'close'));

export const chatbotActions = {
  open,
  close,
};
