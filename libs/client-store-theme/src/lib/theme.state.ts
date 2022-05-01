import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { themeActions } from './theme.actions';
import { IThemeState, THEME_STATE_TOKEN, themeInitialState, TThemePayload } from './theme.interface';

@State<IThemeState>({
  name: THEME_STATE_TOKEN,
  defaults: {
    ...themeInitialState,
  },
})
@Injectable()
export class AppThemeState {
  constructor(private readonly overlayContainer: OverlayContainer) {}

  @Selector()
  public static state(state: IThemeState) {
    return state;
  }

  @Selector()
  public static darkThemeEnabled(state: IThemeState) {
    return state.darkThemeEnabled;
  }

  @Action(themeActions.enableDarkTheme)
  public enableDarkTheme(ctx: StateContext<IThemeState>) {
    this.overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    return ctx.patchState({ darkThemeEnabled: true });
  }

  @Action(themeActions.disableDarkTheme)
  public disableDarkTheme(ctx: StateContext<IThemeState>) {
    this.overlayContainer.getContainerElement().classList.remove('unicorn-dark-theme');
    return ctx.patchState({ darkThemeEnabled: false });
  }

  @Action(themeActions.toggleDarkTheme)
  public toggleDarkTheme(ctx: StateContext<IThemeState>) {
    const state = ctx.getState();
    const darkThemeEnabled = state.darkThemeEnabled;
    return darkThemeEnabled ? this.disableDarkTheme(ctx) : this.enableDarkTheme(ctx);
  }

  @Action(themeActions.setState)
  public setState(ctx: StateContext<IThemeState>, { payload }: TThemePayload) {
    return ctx.patchState(payload);
  }
}
