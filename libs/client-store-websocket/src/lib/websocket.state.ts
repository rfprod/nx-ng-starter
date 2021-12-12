import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { AppWebsocketApiService } from './services/websocket-api.service';
import { websocketActions } from './websocket.actions';
import { IAppWebsocketStateModel, TWebsocketPayload, WEBSOCKET_STATE_TOKEN, websocketInitialState } from './websocket.interface';

@State<IAppWebsocketStateModel>({
  name: WEBSOCKET_STATE_TOKEN,
  defaults: {
    ...websocketInitialState,
  },
})
@Injectable()
export class AppWebsocketState {
  constructor(private readonly api: AppWebsocketApiService) {}

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

  @Action(websocketActions.setState)
  public setState(ctx: StateContext<IAppWebsocketStateModel>, { payload }: TWebsocketPayload) {
    const currentState: IAppWebsocketStateModel = ctx.getState();
    const users = payload.users ?? currentState.users;
    const events = [...currentState.events, ...(payload.events ?? [])];
    const newState: IAppWebsocketStateModel = { events, users };
    return ctx.patchState(newState);
  }

  @Action(websocketActions.connect)
  public connect(ctx: StateContext<IAppWebsocketStateModel>) {
    void this.api
      .connect()
      .pipe(
        tap(event => {
          const payload = {
            users: event.event === 'users' ? event.data : 0,
            events: [event],
          };
          void ctx.dispatch(new websocketActions.setState(payload));
        }),
      )
      .subscribe();
  }

  @Action(websocketActions.getEvents)
  public getEvents() {
    this.api.sendEvent('events');
  }
}
