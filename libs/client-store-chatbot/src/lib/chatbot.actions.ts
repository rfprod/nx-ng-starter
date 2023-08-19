import { actionType } from '@app/client-util-ngrx';
import { createAction } from '@ngrx/store';

import { chatbotReducerConfig } from './chatbot.interface';

export const chatbotAction = {
  open: createAction(actionType(chatbotReducerConfig.featureName, 'open')),
  close: createAction(actionType(chatbotReducerConfig.featureName, 'close')),
};
