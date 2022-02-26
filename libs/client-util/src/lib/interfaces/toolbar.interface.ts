export interface IToolbarButton {
  routerLink: { outlets: { [key: string]: string[] } }[];
  routeActive: () => boolean;
  icon: string;
  title: string;
}

export const toolbarButton = (title = '', icon = '', routeActive: () => boolean = () => false, routerLink: [] = []) =>
  <IToolbarButton>{ title, icon, routeActive, routerLink };

export interface IToolbarAnchor {
  href: string;
  icon: string;
  title: string;
}

export const toolbarAnchor = (title = '', icon = '', href = '') => <IToolbarAnchor>{ title, icon, href };
