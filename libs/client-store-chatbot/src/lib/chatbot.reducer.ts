import { Injectable, InjectionToken, Provider } from '@angular/core';
import { ActionReducer, createReducer, on } from '@ngrx/store';

import { chatbotActions } from './chatbot.actions';
import { featureName, IChatbotStateModel } from './chatbot.interface';

@Injectable({
  providedIn: 'root',
})
export class AppChatbotReducer {
  public static readonly initialState: IChatbotStateModel = {
    chatbotOpen: false,
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
      on(chatbotActions.open, () => ({ chatbotOpen: true })),
      on(chatbotActions.close, () => ({ chatbotOpen: false })),
    );
  }
}
