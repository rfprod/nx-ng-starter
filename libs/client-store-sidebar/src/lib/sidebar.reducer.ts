import { Injectable, InjectionToken, Provider } from '@angular/core';
import { ActionReducer, createReducer, on } from '@ngrx/store';

import { sidebarActions } from './sidebar.actions';
import { featureName, ISidebarStateModel } from './sidebar.interface';

@Injectable({
  providedIn: 'root',
})
export class AppSidebarReducer {
  public static readonly initialState: ISidebarStateModel = {
    sidebarOpen: false,
  };

  public static readonly token = new InjectionToken<ActionReducer<ISidebarStateModel>>(`${featureName} reducer`);

  public static readonly provider: Provider = {
    provide: AppSidebarReducer.token,
    deps: [AppSidebarReducer],
    useFactory: (reducer: AppSidebarReducer) => reducer.createReducer(),
  };

  public createReducer() {
    return createReducer(
      AppSidebarReducer.initialState,
      on(sidebarActions.open, () => ({ sidebarOpen: true })),
      on(sidebarActions.close, () => ({ sidebarOpen: false })),
      on(sidebarActions.toggle, state => ({ sidebarOpen: !state.sidebarOpen })),
    );
  }
}
