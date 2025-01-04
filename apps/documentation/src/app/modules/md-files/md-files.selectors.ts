import { createSelector } from '@ngrx/store';

import type { IMdFilesState, IMdFilesStateModel } from './md-files.interface';

const selectMdFilesFeature = (state: IMdFilesState) => state.mdFiles;

export const mdFilesSelector = {
  filePath: createSelector(selectMdFilesFeature, (state: IMdFilesStateModel) => state.filePath),
};
