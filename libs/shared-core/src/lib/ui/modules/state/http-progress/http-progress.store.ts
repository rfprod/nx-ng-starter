import { Action, Selector, State, StateContext } from '@ngxs/store';

import { HttpProgressPayload, IHttpProgressStateModel } from './http-progress.interface';

import { actionPayloadConstructor } from '@nx-ng-starter/shared-core/util';

const createAction = actionPayloadConstructor('HttpProgress');
const StartProgress = createAction<HttpProgressPayload>('Start');
const StopProgress = createAction<HttpProgressPayload>('Stop');

@State<IHttpProgressStateModel>({
  name: 'httpProgress',
  defaults: {
    mainView: false,
  },
})
class HttpProgressState {
  @Selector()
  public static AllProgress(state: IHttpProgressStateModel) {
    return state;
  }

  @Selector()
  public static MainViewProgress(state: IHttpProgressStateModel) {
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
