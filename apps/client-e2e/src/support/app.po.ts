/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const getAppRoot = () => cy.get('app-root');

export const getAppIndex = () => cy.get('app-index');

export const getToolbars = () => cy.get('mat-toolbar');

export const getTopToolbar = () => cy.get('body mat-toolbar:first');

export const getBottomToolbar = () => cy.get('body mat-toolbar:last');

export const getSidenav = () => cy.get('mat-sidenav');
