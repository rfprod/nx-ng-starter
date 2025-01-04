import { InjectionToken } from '@angular/core';
import type { IReducerConfig } from '@app/client-util-ngrx';
import type { ActionReducer } from '@ngrx/store';

/** Chatbot state model. */
export interface IChatbotStateModel {
  chatbotOpen: boolean;
}

/** Chatbot state. */
export interface IChatbotState {
  chatbot: IChatbotStateModel;
}

/** Chatbot reducer configuration. */
export const chatbotReducerConfig: IReducerConfig<keyof IChatbotState, IChatbotStateModel> = {
  featureName: 'chatbot',
  token: new InjectionToken<ActionReducer<IChatbotStateModel>>('chatbot reducer'),
  initialState: {
    chatbotOpen: false,
  },
};
