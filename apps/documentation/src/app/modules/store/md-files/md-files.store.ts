import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/client-util';

import { IMdFilesState, TSelectMdFilePayload } from './md-files.interface';

const createAction = actionPayloadConstructor('MdFiles');
const setState = createAction<TSelectMdFilePayload>('set state');

@State<IMdFilesState>({
  name: 'mdFiles',
  defaults: {
    mdFilePaths: [],
    filePath: 'md/README.md',
  },
})
@Injectable({
  providedIn: 'root',
})
export class AppMdFilesState {
  @Selector()
  public static state(state: IMdFilesState) {
    return state;
  }

  @Selector()
  public static getMdFiles(state: IMdFilesState) {
    return state.mdFilePaths;
  }

  @Selector()
  public static getSelectedFilePath(state: IMdFilesState) {
    return state.filePath;
  }

  @Action(setState)
  public setState(ctx: StateContext<IMdFilesState>, { payload }: TSelectMdFilePayload) {
    return ctx.patchState(payload);
  }
}

export const mdFilesActions = {
  setState,
};
