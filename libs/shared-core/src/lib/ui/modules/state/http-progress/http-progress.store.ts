import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/shared-core/util';

import { HttpProgressPayload, IHttpProgressStateModel } from './http-progress.interface';

const createAction = actionPayloadConstructor('HttpProgress');
const StartProgress = createAction<HttpProgressPayload>('Start');
const StopProgress = createAction<HttpProgressPayload>('Stop');

@State<IHttpProgressStateModel>({
  name: 'httpProgress',
  defaults: {
    mainView: false,
  },
})
@Injectable({
  providedIn: 'root',
})
class HttpProgressState {
  @Selector()
  public static allProgress(state: IHttpProgressStateModel) {
    return state;
  }

  @Selector()
  public static mainViewProgress(state: IHttpProgressStateModel) {
    return state.mainView;
  }

  @Action(StartProgress)
  public startProgress(
    ctx: StateContext<IHttpProgressStateModel>,
    { payload }: HttpProgressPayload,
  ) {
    return ctx.patchState(payload);
  }

  @Action(StopProgress)
  public stopProgress(
    ctx: StateContext<IHttpProgressStateModel>,
    { payload }: HttpProgressPayload,
  ) {
    return ctx.patchState(payload);
  }
}

const httpProgressActions = {
  StartProgress,
  StopProgress,
};
export { HttpProgressState, httpProgressActions };
