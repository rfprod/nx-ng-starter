import { Injectable, Provider } from '@angular/core';
import { createReducer, on } from '@ngrx/store';

import { chatbotAction } from './chatbot.actions';
import { chatbotReducerConfig } from './chatbot.interface';

@Injectable({
  providedIn: 'root',
})
export class AppChatbotReducer {
  public createReducer() {
    return createReducer(
      chatbotReducerConfig.initialState,
      on(chatbotAction.open, () => ({ chatbotOpen: true })),
      on(chatbotAction.close, () => ({ chatbotOpen: false })),
    );
  }
}

export const chatbotReducerProvider: Provider = {
  provide: chatbotReducerConfig.token,
  deps: [AppChatbotReducer],
  useFactory: (reducer: AppChatbotReducer) => reducer.createReducer(),
};
