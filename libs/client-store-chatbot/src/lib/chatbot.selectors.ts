import { createSelector } from '@ngrx/store';

import { IChatbotState, IChatbotStateModel } from './chatbot.interface';

const selectFeature = (state: IChatbotState) => state.chatbot;

const chatbotOpened = createSelector(selectFeature, (state: IChatbotStateModel) => state.chatbotOpened);

export const chatbotSelectors = {
  chatbotOpened,
};
