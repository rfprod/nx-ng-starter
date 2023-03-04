import { InjectionToken } from '@angular/core';
import { IReducerConfig } from '@app/client-util-ngrx';
import { ActionReducer } from '@ngrx/store';

export interface IChatbotStateModel {
  chatbotOpen: boolean;
}

export interface IChatbotState {
  chatbot: IChatbotStateModel;
}

export const chatbotReducerConfig: IReducerConfig<keyof IChatbotState, IChatbotStateModel> = {
  featureName: 'chatbot',
  token: new InjectionToken<ActionReducer<IChatbotStateModel>>('chatbot reducer'),
  initialState: {
    chatbotOpen: false,
  },
};
