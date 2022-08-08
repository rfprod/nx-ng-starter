export interface IMdFilesStateModel {
  filePath: string;
}

export interface IMdFilesState {
  mdFiles: IMdFilesStateModel;
}

export const featureName: keyof IMdFilesState = 'mdFiles';
