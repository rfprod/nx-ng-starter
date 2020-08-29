import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/client-util';
import { tap } from 'rxjs/operators';

import {
  HTTP_API_STATE,
  httpApiInitialState,
  IAppHttpApiState,
  IAppHttpApiStatePayload,
  THttpApiPayload,
} from './http-api.interface';
import { AppHttpApiService } from './http-api.service';

const createAction = actionPayloadConstructor(HTTP_API_STATE.getName());
const ping = createAction<THttpApiPayload>('ping');

export const httpApiActions = {
  ping,
};

@State<IAppHttpApiState>({
  name: HTTP_API_STATE,
  defaults: {
    ...httpApiInitialState,
  },
})
@Injectable({
  providedIn: 'root',
})
export class AppHttpApiState {
  constructor(private readonly api: AppHttpApiService) {}

  @Selector()
  public static allData(state: IAppHttpApiState) {
    return state;
  }

  @Selector()
  public static ping(state: IAppHttpApiState) {
    return state.ping;
  }

  @Action(ping)
  public ping(ctx: StateContext<IAppHttpApiState>, { payload }: THttpApiPayload) {
    return this.api.ping().pipe(
      tap(result => {
        const pingPayload: IAppHttpApiStatePayload = {
          ping: result.message,
        };
        ctx.patchState(pingPayload);
      }),
    );
  }
}
