/**
 * Gets an iframe content.
 */
export const getIframe = () =>
  cy.get('iframe[id="storybook-preview-iframe"]').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap);
