import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/shared-util';

import { IWebsocketStateModel, TWebsocketPayload } from './websocket.interface';

const createAction = actionPayloadConstructor('Websocket');
const setState = createAction<TWebsocketPayload>('Set state');

export const websocketActions = {
  setState,
};

@State<IWebsocketStateModel>({
  name: 'websocket',
  defaults: {
    users: 0,
    events: [],
  },
})
@Injectable({
  providedIn: 'root',
})
export class WebsocketState {
  @Selector()
  public static getState(state: IWebsocketStateModel) {
    return state;
  }

  @Selector()
  public static getUsers(state: IWebsocketStateModel) {
    return state.users;
  }

  @Selector()
  public static getEvents(state: IWebsocketStateModel) {
    return state.events;
  }

  @Action(setState)
  public setState(ctx: StateContext<IWebsocketStateModel>, { payload }: TWebsocketPayload) {
    const currentState: IWebsocketStateModel = ctx.getState();
    const users = payload.users ?? currentState.users;
    const events = [...currentState.events, ...(payload.events ?? [])];
    const newState: IWebsocketStateModel = { events, users };
    return ctx.patchState(newState);
  }
}
