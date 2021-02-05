import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { setThemeState } from './theme.actions';
import { IThemeStateModel, THEME_STATE_TOKEN, TThemePayload } from './theme.interface';

const themeThemeActions = {
  setThemeState,
};

@State<IThemeStateModel>({
  name: THEME_STATE_TOKEN,
  defaults: {
    darkThemeEnabled: false,
  },
})
@Injectable()
class AppThemeState {
  @Selector()
  public static getTheme(state: IThemeStateModel) {
    return state;
  }

  @Selector()
  public static getDarkThemeEnabled(state: IThemeStateModel) {
    return state.darkThemeEnabled;
  }

  @Action(setThemeState)
  public setThemeState(ctx: StateContext<IThemeStateModel>, { payload }: TThemePayload) {
    return ctx.patchState(payload);
  }
}

export { AppThemeState, themeThemeActions };
