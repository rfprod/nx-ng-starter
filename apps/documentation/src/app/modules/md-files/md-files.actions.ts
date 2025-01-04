import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { type IMdFilesStateModel, mdFilesReducerConfig } from './md-files.interface';

export const mdFilesAction = {
  showReadme: createAction(
    actionType(mdFilesReducerConfig.featureName, 'show readme'),
    props<{ filePath: IMdFilesStateModel['filePath'] }>(),
  ),
};
