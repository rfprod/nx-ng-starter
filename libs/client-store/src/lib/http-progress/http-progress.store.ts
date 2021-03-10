import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { displayToast, startProgress, stopProgress } from './http-progress.actions';
import {
  HTTP_PROGRESS_STATE_TOKEN,
  httpProgressInitialState,
  IAppHttpProgressState,
  THttpProgressPayload,
  TShowToastPayload,
} from './http-progress.interface';
import { AppHttpProgressService } from './http-progress.service';
import { AppToasterService } from './services/toaster/toaster.service';

export const httpProgressActions = {
  startProgress,
  stopProgress,
  displayToast,
};

@State<IAppHttpProgressState>({
  name: HTTP_PROGRESS_STATE_TOKEN,
  defaults: {
    ...httpProgressInitialState,
  },
})
@Injectable()
export class AppHttpProgressState {
  constructor(
    private readonly toaster: AppToasterService,
    private readonly service: AppHttpProgressService,
  ) {}

  @Selector()
  public static allProgress(state: IAppHttpProgressState) {
    return state;
  }

  @Selector()
  public static mainViewProgress(state: IAppHttpProgressState) {
    return state.mainView;
  }

  @Action(startProgress)
  public startProgress(
    ctx: StateContext<IAppHttpProgressState>,
    { payload }: THttpProgressPayload,
  ) {
    const newState = { mainView: { ...ctx.getState().mainView } };
    const keys = Object.keys(payload);
    for (const key of keys) {
      if (key in newState) {
        const k = key as keyof IAppHttpProgressState;
        newState[k].counter = newState[k].counter + 1;
        newState[k].loading = newState[k].counter > 0;
      }
    }
    if (newState.mainView.loading) {
      this.service.handlers.mainView.start();
    }
    return ctx.patchState(newState);
  }

  @Action(stopProgress)
  public stopProgress(ctx: StateContext<IAppHttpProgressState>, { payload }: THttpProgressPayload) {
    const newState = { mainView: { ...ctx.getState().mainView } };
    const keys = Object.keys(payload);
    for (const key of keys) {
      if (key in newState) {
        const k = key as keyof IAppHttpProgressState;
        newState[k].counter = newState[k].counter - 1 >= 0 ? newState[k].counter - 1 : 0;
        newState[k].loading = newState[k].counter > 0;
      }
    }
    if (!newState.mainView.loading) {
      this.service.handlers.mainView.stop();
    }
    return ctx.patchState(newState);
  }

  @Action(displayToast)
  public displayToast(ctx: StateContext<IAppHttpProgressState>, { payload }: TShowToastPayload) {
    this.toaster.showToaster(payload.message, payload.type, payload.duration);
  }
}
