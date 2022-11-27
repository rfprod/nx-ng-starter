import { createSelector } from '@ngrx/store';

import { IChatbotState, IChatbotStateModel } from './chatbot.interface';

const selectFeature = (state: IChatbotState) => state.chatbot;

const chatbotOpen = createSelector(selectFeature, (state: IChatbotStateModel) => state.chatbotOpen);

export const chatbotSelectors = {
  chatbotOpen,
};
