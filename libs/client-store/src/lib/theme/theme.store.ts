import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { themeActions } from './theme.actions';
import { IThemeStateModel, THEME_STATE_TOKEN, themeInitialState, TThemePayload } from './theme.interface';

@State<IThemeStateModel>({
  name: THEME_STATE_TOKEN,
  defaults: {
    ...themeInitialState,
  },
})
@Injectable()
export class AppThemeState {
  constructor(private readonly overlayContainer: OverlayContainer) {}

  @Selector()
  public static getTheme(state: IThemeStateModel) {
    return state;
  }

  @Selector()
  public static darkThemeEnabled(state: IThemeStateModel) {
    return state.darkThemeEnabled;
  }

  @Action(themeActions.enableDarkTheme)
  public enableDarkTheme(ctx: StateContext<IThemeStateModel>) {
    this.overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    return ctx.patchState({ darkThemeEnabled: true });
  }

  @Action(themeActions.disableDarkTheme)
  public disableDarkTheme(ctx: StateContext<IThemeStateModel>) {
    this.overlayContainer.getContainerElement().classList.remove('unicorn-dark-theme');
    return ctx.patchState({ darkThemeEnabled: false });
  }

  @Action(themeActions.toggleDarkTheme)
  public toggleDarkTheme(ctx: StateContext<IThemeStateModel>) {
    const state = ctx.getState();
    const darkThemeEnabled = state.darkThemeEnabled;
    switch (darkThemeEnabled) {
      case true:
        return this.disableDarkTheme(ctx);
      case false:
        return this.enableDarkTheme(ctx);
      default:
        return state;
    }
  }

  @Action(themeActions.setState)
  public setState(ctx: StateContext<IThemeStateModel>, { payload }: TThemePayload) {
    return ctx.patchState(payload);
  }
}
