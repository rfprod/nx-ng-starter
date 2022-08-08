export interface ISidebarStateModel {
  sidebarOpened: boolean;
}

export interface ISidebarState {
  sidebar: ISidebarStateModel;
}

export const featureName: keyof ISidebarState = 'sidebar';
