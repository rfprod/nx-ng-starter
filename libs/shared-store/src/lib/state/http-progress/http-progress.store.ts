import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/shared-util';

import { IAppHttpProgressStateModel, THttpProgressPayload } from './http-progress.interface';

const createAction = actionPayloadConstructor('HttpProgress');
const startProgress = createAction<THttpProgressPayload>('Start');
const stopProgress = createAction<THttpProgressPayload>('Stop');

@State<IAppHttpProgressStateModel>({
  name: 'httpProgress',
  defaults: {
    mainView: false,
  },
})
@Injectable({
  providedIn: 'root',
})
class AppHttpProgressState {
  @Selector()
  public static allProgress(state: IAppHttpProgressStateModel) {
    return state;
  }

  @Selector()
  public static mainViewProgress(state: IAppHttpProgressStateModel) {
    return state.mainView;
  }

  @Action(startProgress)
  public startProgress(
    ctx: StateContext<IAppHttpProgressStateModel>,
    { payload }: THttpProgressPayload,
  ) {
    return ctx.patchState(payload);
  }

  @Action(stopProgress)
  public stopProgress(
    ctx: StateContext<IAppHttpProgressStateModel>,
    { payload }: THttpProgressPayload,
  ) {
    return ctx.patchState(payload);
  }
}

const httpProgressActions = {
  startProgress,
  stopProgress,
};
export { AppHttpProgressState, httpProgressActions };
