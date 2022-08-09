import { Injectable, InjectionToken, Provider } from '@angular/core';
import { ActionReducer, createReducer, on } from '@ngrx/store';

import { themeActions } from './theme.actions';
import { featureName, IThemeStateModel } from './theme.interface';

@Injectable({
  providedIn: 'root',
})
export class AppThemeReducer {
  public static readonly initialState: IThemeStateModel = {
    darkThemeEnabled: false,
  };

  public static readonly token = new InjectionToken<ActionReducer<IThemeStateModel>>(`${featureName} reducer`);

  public static readonly provider: Provider = {
    provide: AppThemeReducer.token,
    deps: [AppThemeReducer],
    useFactory: (reducer: AppThemeReducer) => reducer.createReducer(),
  };

  public createReducer() {
    return createReducer(
      AppThemeReducer.initialState,
      on(themeActions.enableDarkTheme, () => ({ darkThemeEnabled: true })),
      on(themeActions.disableDarkTheme, () => ({ darkThemeEnabled: false })),
    );
  }
}
