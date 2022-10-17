/**
 * Gets application sidenav.
 */
export const getSidenav = () => cy.get('mat-sidenav').should('not.be.empty').then(cy.wrap);
