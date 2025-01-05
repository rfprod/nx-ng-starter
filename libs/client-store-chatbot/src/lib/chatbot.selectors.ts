import { createSelector } from '@ngrx/store';

import type { IChatbotState, IChatbotStateModel } from './chatbot.interface';

const selectFeature = (state: IChatbotState) => state.chatbot;

export const chatbotSelector = {
  chatbotOpen: createSelector(selectFeature, (state: IChatbotStateModel) => state.chatbotOpen),
};
