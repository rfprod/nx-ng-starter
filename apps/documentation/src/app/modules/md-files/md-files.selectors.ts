import { createSelector } from '@ngrx/store';

import { IMdFilesState, IMdFilesStateModel } from './md-files.interface';

const selectMdFilesFeature = (state: IMdFilesState) => state.mdFiles;

const filePath = createSelector(selectMdFilesFeature, (state: IMdFilesStateModel) => state.filePath);

export const mdFilesSelectors = {
  filePath,
};
