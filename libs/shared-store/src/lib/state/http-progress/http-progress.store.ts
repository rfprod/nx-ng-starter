import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/shared-util';

import { IHttpProgressStateModel, THttpProgressPayload } from './http-progress.interface';

const createAction = actionPayloadConstructor('HttpProgress');
const startProgress = createAction<THttpProgressPayload>('Start');
const stopProgress = createAction<THttpProgressPayload>('Stop');

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

  @Action(startProgress)
  public startProgress(
    ctx: StateContext<IHttpProgressStateModel>,
    { payload }: THttpProgressPayload,
  ) {
    return ctx.patchState(payload);
  }

  @Action(stopProgress)
  public stopProgress(
    ctx: StateContext<IHttpProgressStateModel>,
    { payload }: THttpProgressPayload,
  ) {
    return ctx.patchState(payload);
  }
}

const httpProgressActions = {
  startProgress,
  stopProgress,
};
export { HttpProgressState, httpProgressActions };
