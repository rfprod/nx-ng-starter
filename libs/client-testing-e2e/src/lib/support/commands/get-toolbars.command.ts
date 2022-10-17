/**
 * Gets application toolbars.
 */
export const getToolbars = () => cy.get('mat-toolbar').should('not.be.empty').then(cy.wrap);

/**
 * Gets top (first) toolbar.
 */
export const getTopToolbar = () => cy.get('body mat-toolbar:first').should('not.be.empty').then(cy.wrap);

/**
 * Gets bottom (last) toolbar.
 */
export const getBottomToolbar = () => cy.get('body mat-toolbar:last').should('not.be.empty').then(cy.wrap);
