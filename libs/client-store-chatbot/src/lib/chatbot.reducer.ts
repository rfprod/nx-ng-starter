import { Injectable, InjectionToken, Provider } from '@angular/core';
import { ActionReducer, createReducer, on } from '@ngrx/store';

import { chatbotActions } from './chatbot.actions';
import { featureName, IChatbotStateModel } from './chatbot.interface';

@Injectable({
  providedIn: 'root',
})
export class AppChatbotReducer {
  public static readonly initialState: IChatbotStateModel = {
    chatbotOpened: false,
  };

  public static readonly token = new InjectionToken<ActionReducer<IChatbotStateModel>>(`${featureName} reducer`);

  public static readonly provider: Provider = {
    provide: AppChatbotReducer.token,
    deps: [AppChatbotReducer],
    useFactory: (reducer: AppChatbotReducer) => reducer.createReducer(),
  };

  public createReducer() {
    return createReducer(
      AppChatbotReducer.initialState,
      on(chatbotActions.toggle, state => ({ chatbotOpened: !state.chatbotOpened })),
    );
  }
}
