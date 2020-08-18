import { IActionPayload } from '@nx-ng-starter/client-util';

export interface IMdFilesState {
  mdFilePaths: string[];
  filePath: string;
}

export type TSelectMdFilePayload = IActionPayload<Partial<IMdFilesState>>;
