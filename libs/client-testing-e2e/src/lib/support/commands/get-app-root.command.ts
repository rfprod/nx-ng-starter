/**
 * Gets application root.
 */
export const getAppRoot = () => cy.get('app-root').should('not.be.empty').then(cy.wrap);
