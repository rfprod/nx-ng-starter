import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { chatbotActions } from './chatbot.actions';
import { CHATBOT_STATE_TOKEN, chatbotInitialState, IChatbotState, TChatbotPayload } from './chatbot.interface';

@State<IChatbotState>({
  name: CHATBOT_STATE_TOKEN,
  defaults: {
    ...chatbotInitialState,
  },
})
@Injectable()
export class AppChatbotState {
  constructor(private readonly store: Store) {}

  @Selector()
  public static getChatbot(state: IChatbotState) {
    return state;
  }

  @Selector()
  public static getSidebarOpened(state: IChatbotState) {
    return state.chatbotOpened;
  }

  @Action(chatbotActions.setState)
  public setState(ctx: StateContext<IChatbotState>, { payload }: TChatbotPayload) {
    return ctx.patchState(payload);
  }

  @Action(chatbotActions.toggle)
  public toggle(ctx: StateContext<IChatbotState>) {
    const opened = ctx.getState().chatbotOpened;
    if (!opened) {
      void this.store.dispatch(new Navigate([{ outlets: { chatbot: ['root'] } }]));
    } else {
      void this.store.dispatch(new Navigate([{ outlets: { chatbot: null } }]));
    }
    return ctx.patchState({ chatbotOpened: !opened });
  }
}
