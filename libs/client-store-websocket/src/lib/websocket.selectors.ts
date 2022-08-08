import { createSelector } from '@ngrx/store';

import { IWebsocketState, IWebsocketStateModel } from './websocket.interface';

const selectFeature = (state: IWebsocketState) => state.websocket;

const events = createSelector(selectFeature, (state: IWebsocketStateModel) => state.events);
const users = createSelector(selectFeature, (state: IWebsocketStateModel) => state.users);

export const websocketSelectors = {
  events,
  users,
};
