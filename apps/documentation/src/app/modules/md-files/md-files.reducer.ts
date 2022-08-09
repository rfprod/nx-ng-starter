import { Injectable, InjectionToken, Provider } from '@angular/core';
import { ActionReducer, createReducer, on } from '@ngrx/store';

import { mdFilesActions } from './md-files.actions';
import { featureName, IMdFilesStateModel } from './md-files.interface';

@Injectable({
  providedIn: 'root',
})
export class AppMdFilesReducer {
  public static readonly initialState: IMdFilesStateModel = {
    filePath: '',
  };

  public static readonly token = new InjectionToken<ActionReducer<IMdFilesStateModel>>(`${featureName} reducer`);

  public static readonly provider: Provider = {
    provide: AppMdFilesReducer.token,
    deps: [AppMdFilesReducer],
    useFactory: (reducer: AppMdFilesReducer) => reducer.createReducer(),
  };

  public createReducer() {
    return createReducer(
      AppMdFilesReducer.initialState,
      on(mdFilesActions.showReadme, (state, { filePath }) => ({ ...state, filePath })),
    );
  }
}
