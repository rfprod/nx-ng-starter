import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/shared-core/util';

import { IHttpApiStateModel, THttpApiPayload } from './http-api.interface';

const createAction = actionPayloadConstructor('HttpApi');
const ping = createAction<THttpApiPayload>('ping');

@State<IHttpApiStateModel>({
  name: 'httpAPI',
  defaults: {
    ping: '',
  },
})
@Injectable({
  providedIn: 'root',
})
class HttpApiState {
  @Selector()
  public static allData(state: IHttpApiStateModel) {
    return state;
  }

  @Selector()
  public static ping(state: IHttpApiStateModel) {
    return state.ping;
  }

  @Action(ping)
  public ping(ctx: StateContext<IHttpApiStateModel>, { payload }: THttpApiPayload) {
    return ctx.patchState(payload);
  }
}

const httpApiActions = {
  ping,
};
export { HttpApiState, httpApiActions };
