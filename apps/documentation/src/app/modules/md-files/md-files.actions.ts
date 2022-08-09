import { createAction, props } from '@ngrx/store';

import { featureName, IMdFilesStateModel } from './md-files.interface';

const type = (name: string) => `[${featureName}] ${name}`;

const showReadme = createAction(type('show readme'), props<{ filePath: IMdFilesStateModel['filePath'] }>());

export const mdFilesActions = {
  showReadme,
};
