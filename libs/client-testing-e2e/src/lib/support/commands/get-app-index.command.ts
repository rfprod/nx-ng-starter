/**
 * Gets application index.
 */
export const getAppIndex = () => cy.get('app-diagnostics-index').should('not.be.empty').then(cy.wrap);
