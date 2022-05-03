import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { AppWebsocketApiService } from './services/websocket-api.service';
import { websocketActions } from './websocket.actions';
import { IAppWebsocketState, TWebsocketPayload, WEBSOCKET_STATE_TOKEN, websocketInitialState } from './websocket.interface';

@State<IAppWebsocketState>({
  name: WEBSOCKET_STATE_TOKEN,
  defaults: {
    ...websocketInitialState,
  },
})
@Injectable()
export class AppWebsocketState {
  constructor(private readonly api: AppWebsocketApiService) {}

  @Selector()
  public static state(state: IAppWebsocketState) {
    return state;
  }

  @Selector()
  public static users(state: IAppWebsocketState) {
    return state.users;
  }

  @Selector()
  public static events(state: IAppWebsocketState) {
    return state.events;
  }

  @Action(websocketActions.setState)
  public setState(ctx: StateContext<IAppWebsocketState>, { payload }: TWebsocketPayload) {
    const currentState: IAppWebsocketState = ctx.getState();
    const users = payload.users ?? currentState.users;
    const events = [...currentState.events, ...(payload.events ?? [])];
    const newState: IAppWebsocketState = { events, users };
    return ctx.patchState(newState);
  }

  @Action(websocketActions.connect)
  public connect(ctx: StateContext<IAppWebsocketState>) {
    void this.api
      .connect()
      .pipe(
        tap(event => {
          const payload = {
            users: event.event === 'users' ? event.data : ctx.getState().users,
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
