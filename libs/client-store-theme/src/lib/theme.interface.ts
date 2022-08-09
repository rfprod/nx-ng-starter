export interface IThemeStateModel {
  darkThemeEnabled: boolean;
}

export interface IThemeState {
  theme: IThemeStateModel;
}

export const featureName: keyof IThemeState = 'theme';
