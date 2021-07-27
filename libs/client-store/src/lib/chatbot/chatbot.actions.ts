import { actionPayloadConstructor } from '@app/client-util';

import { CHATBOT_STATE_TOKEN, TChatbotPayload } from './chatbot.interface';

const createAction = actionPayloadConstructor(CHATBOT_STATE_TOKEN.getName());

const setState = createAction<TChatbotPayload>('set state');
const toggle = createAction('toggle');

export const chatbotActions = {
  setState,
  toggle,
};
