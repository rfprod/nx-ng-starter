import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/shared-core/util';
import { HttpApiPayload, IHttpApiStateModel } from './http-api.interface';

const createAction = actionPayloadConstructor('HttpApi');
const Ping = createAction<HttpApiPayload>('Ping');

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
  public static AllData(state: IHttpApiStateModel) {
    return state;
  }

  @Selector()
  public static Ping(state: IHttpApiStateModel) {
    return state.ping;
  }

  @Action(Ping)
  public ping(ctx: StateContext<IHttpApiStateModel>, { payload }: HttpApiPayload) {
    return ctx.patchState(payload);
  }
}

const httpApiActions = {
  Ping,
};
export { HttpApiState, httpApiActions };
