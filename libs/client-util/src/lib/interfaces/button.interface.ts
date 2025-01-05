import type { Router } from '@angular/router';

export type TRouterCommands = Array<{ outlets: { [key: string]: string[] } }>;

export interface IRouterButton {
  routerLink: TRouterCommands;
  routeActive: () => boolean;
  icon: string;
  title: string;
}

/**
 * Router button object factory.
 * @param title button title
 * @param icon button icon, see here https://fonts.google.com/icons
 * @param routeActive returns whether the router path is activated
 * @param routerLink router link
 * @returns router button object
 */
export const routerButton = (title: string, icon: string, routeActive: Router['isActive'], routerLink: TRouterCommands) =>
  ({ title, icon, routeActive, routerLink }) as IRouterButton;

export interface IAnchorButton {
  href: string;
  icon: string;
  title: string;
}

/**
 * Anchor button object factory.
 * @param title button title
 * @param icon button icon, see here https://fonts.google.com/icons
 * @param href link href
 * @returns anchor button object
 */
export const anchorButton = (title: string, icon: string, href: string) => ({ title, icon, href }) as IAnchorButton;
