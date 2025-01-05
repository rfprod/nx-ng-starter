import { InjectionToken } from '@angular/core';
import type { IReducerConfig } from '@app/client-util-ngrx';
import type { ActionReducer } from '@ngrx/store';

export interface IMdFilesStateModel {
  filePath: string;
}

export interface IMdFilesState {
  mdFiles: IMdFilesStateModel;
}

export const mdFilesReducerConfig: IReducerConfig<keyof IMdFilesState, IMdFilesStateModel> = {
  featureName: 'mdFiles',
  token: new InjectionToken<ActionReducer<IMdFilesStateModel>>('mdFiles reducer'),
  initialState: {
    filePath: '',
  },
};
