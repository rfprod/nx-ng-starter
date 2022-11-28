export interface ISidebarStateModel {
  sidebarOpen: boolean;
}

export interface ISidebarState {
  sidebar: ISidebarStateModel;
}

export const featureName: keyof ISidebarState = 'sidebar';
