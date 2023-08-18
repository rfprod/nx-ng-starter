import { Injectable, Provider } from '@angular/core';
import { createReducer, on } from '@ngrx/store';

import { themeAction } from './theme.actions';
import { themeReducerConfig } from './theme.interface';

@Injectable({
  providedIn: 'root',
})
export class AppThemeReducer {
  public createReducer() {
    return createReducer(
      themeReducerConfig.initialState,
      on(themeAction.enableDarkTheme, () => ({ darkThemeEnabled: true })),
      on(themeAction.disableDarkTheme, () => ({ darkThemeEnabled: false })),
    );
  }
}

export const themeReducerProvider: Provider = {
  provide: themeReducerConfig.token,
  deps: [AppThemeReducer],
  useFactory: (reducer: AppThemeReducer) => reducer.createReducer(),
};
