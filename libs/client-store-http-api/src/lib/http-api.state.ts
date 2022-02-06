import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { httpApiActions } from './http-api.actions';
import { HTTP_API_STATE_TOKEN, httpApiInitialState, IAppHttpApiState, IPingPayload } from './http-api.interface';
import { AppHttpApiService } from './http-api.service';

@State<IAppHttpApiState>({
  name: HTTP_API_STATE_TOKEN,
  defaults: {
    ...httpApiInitialState,
  },
})
@Injectable()
export class AppHttpApiState {
  constructor(private readonly api: AppHttpApiService) {}

  @Selector()
  public static state(state: IAppHttpApiState) {
    return state;
  }

  @Selector()
  public static ping(state: IAppHttpApiState) {
    return state.ping;
  }

  @Action(httpApiActions.ping)
  public ping(ctx: StateContext<IAppHttpApiState>) {
    return this.api.ping().pipe(
      tap(result => {
        const pingPayload: IPingPayload = {
          ping: result.message,
        };
        ctx.patchState(pingPayload);
      }),
    );
  }
}
