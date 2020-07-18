import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/shared-util';

import { IAppWebsocketStateModel, TWebsocketPayload } from './websocket.interface';

const createAction = actionPayloadConstructor('Websocket');
const setState = createAction<TWebsocketPayload>('Set state');

export const websocketActions = {
  setState,
};

@State<IAppWebsocketStateModel>({
  name: 'websocket',
  defaults: {
    users: 0,
    events: [],
  },
})
@Injectable({
  providedIn: 'root',
})
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
