import { Injectable, Provider } from '@angular/core';
import { createReducer, on } from '@ngrx/store';

import { httpProgressActions } from './http-progress.actions';
import { httpProgressReducerConfig, IHttpProgressStateModel } from './http-progress.interface';

@Injectable({
  providedIn: 'root',
})
export class AppHttpProgressReducer {
  public createReducer() {
    return createReducer(
      httpProgressReducerConfig.initialState,
      on(httpProgressActions.start, (state, { payload }) => {
        const nextState = { mainView: { ...state.mainView }, sidebar: { ...state.sidebar }, toaster: { ...state.toaster } };
        const keys = Object.keys(payload).length === 0 ? ['mainView'] : Object.keys(payload);
        for (const key of keys) {
          if (key in nextState) {
            const k = key as keyof IHttpProgressStateModel;
            if (k === 'mainView' || k === 'sidebar') {
              nextState[k].counter = nextState[k].counter + 1;
              nextState[k].loading = nextState[k].counter > 0;
            }
          }
        }
        return nextState;
      }),
      on(httpProgressActions.stop, (state, { payload }) => {
        const nextState = { mainView: { ...state.mainView }, sidebar: { ...state.sidebar }, toaster: { ...state.toaster } };
        const keys = Object.keys(payload).length === 0 ? ['mainView'] : Object.keys(payload);
        for (const key of keys) {
          if (key in nextState) {
            const k = key as keyof IHttpProgressStateModel;
            if (k === 'mainView' || k === 'sidebar') {
              nextState[k].counter = nextState[k].counter - 1 >= 0 ? nextState[k].counter - 1 : 0;
              nextState[k].loading = nextState[k].counter > 0;
            }
          }
        }
        return nextState;
      }),
      on(httpProgressActions.displayToast, (state, { payload }) => ({ ...state, toaster: { ...payload } })),
    );
  }
}

export const httpProgressReducerProvider: Provider = {
  provide: httpProgressReducerConfig.token,
  deps: [AppHttpProgressReducer],
  useFactory: (reducer: AppHttpProgressReducer) => reducer.createReducer(),
};
