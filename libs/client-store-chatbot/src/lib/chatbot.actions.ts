import { createAction } from '@ngrx/store';

import { featureName } from './chatbot.interface';

const type = (name: string) => `[${featureName}] ${name}`;

const open = createAction(type('open'));

const close = createAction(type('close'));

const toggle = createAction(type('toggle'));

export const chatbotActions = {
  open,
  close,
  toggle,
};
