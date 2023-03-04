import { Injectable, Provider } from '@angular/core';
import { createReducer, on } from '@ngrx/store';

import { mdFilesActions } from './md-files.actions';
import { mdFilesReducerConfig } from './md-files.interface';

@Injectable({
  providedIn: 'root',
})
export class AppMdFilesReducer {
  public createReducer() {
    return createReducer(
      mdFilesReducerConfig.initialState,
      on(mdFilesActions.showReadme, (state, { filePath }) => ({ ...state, filePath })),
    );
  }
}

export const mdFilesReducerProvider: Provider = {
  provide: mdFilesReducerConfig.token,
  deps: [AppMdFilesReducer],
  useFactory: (reducer: AppMdFilesReducer) => reducer.createReducer(),
};
