import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/client-util';

import { IAppHttpApiStateModel, THttpApiPayload } from './http-api.interface';

const createAction = actionPayloadConstructor('HttpApi');
const ping = createAction<THttpApiPayload>('ping');

@State<IAppHttpApiStateModel>({
  name: 'httpAPI',
  defaults: {
    ping: '',
  },
})
@Injectable({
  providedIn: 'root',
})
class AppHttpApiState {
  @Selector()
  public static allData(state: IAppHttpApiStateModel) {
    return state;
  }

  @Selector()
  public static ping(state: IAppHttpApiStateModel) {
    return state.ping;
  }

  @Action(ping)
  public ping(ctx: StateContext<IAppHttpApiStateModel>, { payload }: THttpApiPayload) {
    return ctx.patchState(payload);
  }
}

const httpApiActions = {
  ping,
};
export { AppHttpApiState, httpApiActions };
