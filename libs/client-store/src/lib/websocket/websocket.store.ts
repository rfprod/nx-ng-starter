import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/client-util';

import {
  IAppWebsocketStateModel,
  TWebsocketPayload,
  WEBSOCKET_STATE_TOKEN,
  websocketInitialState,
} from './websocket.interface';

const createAction = actionPayloadConstructor(WEBSOCKET_STATE_TOKEN.getName());
const setState = createAction<TWebsocketPayload>('set state');

export const websocketActions = {
  setState,
};

@State<IAppWebsocketStateModel>({
  name: WEBSOCKET_STATE_TOKEN,
  defaults: {
    ...websocketInitialState,
  },
})
@Injectable()
export class AppWebsocketState {
  @Selector()
  public static getState(state: IAppWebsocketStateModel) {
    return state;
  }

  @Selector()
  public static getUsers(state: IAppWebsocketStateModel) {
    return state.users;
  }

  @Selector()
  public static getEvents(state: IAppWebsocketStateModel) {
    return state.events;
  }

  @Action(setState)
  public setState(ctx: StateContext<IAppWebsocketStateModel>, { payload }: TWebsocketPayload) {
    const currentState: IAppWebsocketStateModel = ctx.getState();
    const users = payload.users ?? currentState.users;
    const events = [...currentState.events, ...(payload.events ?? [])];
    const newState: IAppWebsocketStateModel = { events, users };
    return ctx.patchState(newState);
  }
}
