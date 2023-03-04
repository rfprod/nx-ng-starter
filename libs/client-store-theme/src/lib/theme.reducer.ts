import { Injectable, Provider } from '@angular/core';
import { createReducer, on } from '@ngrx/store';

import { themeActions } from './theme.actions';
import { themeReducerConfig } from './theme.interface';

@Injectable({
  providedIn: 'root',
})
export class AppThemeReducer {
  public createReducer() {
    return createReducer(
      themeReducerConfig.initialState,
      on(themeActions.enableDarkTheme, () => ({ darkThemeEnabled: true })),
      on(themeActions.disableDarkTheme, () => ({ darkThemeEnabled: false })),
    );
  }
}

export const themeReducerProvider: Provider = {
  provide: themeReducerConfig.token,
  deps: [AppThemeReducer],
  useFactory: (reducer: AppThemeReducer) => reducer.createReducer(),
};
