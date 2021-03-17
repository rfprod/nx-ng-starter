import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { themeActions } from './theme.actions';
import { IThemeStateModel, THEME_STATE_TOKEN, TThemePayload } from './theme.interface';

@State<IThemeStateModel>({
  name: THEME_STATE_TOKEN,
  defaults: {
    darkThemeEnabled: false,
  },
})
@Injectable()
export class AppThemeState {
  @Selector()
  public static getTheme(state: IThemeStateModel) {
    return state;
  }

  @Selector()
  public static getDarkThemeEnabled(state: IThemeStateModel) {
    return state.darkThemeEnabled;
  }

  @Action(themeActions.setState)
  public setState(ctx: StateContext<IThemeStateModel>, { payload }: TThemePayload) {
    return ctx.patchState(payload);
  }
}
