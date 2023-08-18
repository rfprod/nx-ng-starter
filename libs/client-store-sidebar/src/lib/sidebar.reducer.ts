import { Injectable, Provider } from '@angular/core';
import { createReducer, on } from '@ngrx/store';

import { sidebarAction } from './sidebar.actions';
import { sidebarReducerConfig } from './sidebar.interface';

@Injectable({
  providedIn: 'root',
})
export class AppSidebarReducer {
  public createReducer() {
    return createReducer(
      sidebarReducerConfig.initialState,
      on(sidebarAction.open, () => ({ sidebarOpen: true })),
      on(sidebarAction.close, () => ({ sidebarOpen: false })),
      on(sidebarAction.toggle, state => ({ sidebarOpen: !state.sidebarOpen })),
    );
  }
}

export const sidebarReducerProvider: Provider = {
  provide: sidebarReducerConfig.token,
  deps: [AppSidebarReducer],
  useFactory: (reducer: AppSidebarReducer) => reducer.createReducer(),
};
