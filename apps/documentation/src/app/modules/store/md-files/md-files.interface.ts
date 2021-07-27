import { IActionPayload } from '@app/client-util';

export interface IMdFilesState {
  mdFilePaths: string[];
  filePath: string;
}

export type TSelectMdFilePayload = IActionPayload<Partial<IMdFilesState>>;
