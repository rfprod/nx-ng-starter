import { Injectable } from '@angular/core';
import { Selector, State, Action, StateContext } from '@ngxs/store';
import { IMdFilesState, TSelectMdFilePayload } from './md-files.interface';
import { actionPayloadConstructor } from '@nx-ng-starter/client-util';

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
export class MdFilesState {
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
  setState
};
