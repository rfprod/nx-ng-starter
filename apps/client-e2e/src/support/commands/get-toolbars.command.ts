/**
 * Gets application toolbars.
 */
export const getToolbars = () => cy.get('mat-toolbar');

/**
 * Gets top (first) toolbar.
 */
export const getTopToolbar = () => cy.get('body mat-toolbar:first');

/**
 * Gets bottom (last) toolbar.
 */
export const getBottomToolbar = () => cy.get('body mat-toolbar:last');
