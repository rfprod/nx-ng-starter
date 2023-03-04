import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { IMdFilesStateModel, mdFilesReducerConfig } from './md-files.interface';

const showReadme = createAction(
  actionType(mdFilesReducerConfig.featureName, 'show readme'),
  props<{ filePath: IMdFilesStateModel['filePath'] }>(),
);

export const mdFilesActions = {
  showReadme,
};
