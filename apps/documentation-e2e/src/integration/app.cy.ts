import { TCypressCustomCommands } from '@app/client-testing-e2e';

declare const cy: TCypressCustomCommands;

describe('documentation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.setViewportSize('default');
  });

  it('should display welcome message', () => {
    cy.get('title').contains('Documentation');
  });

  it('should have one app-root html element', () => {
    cy.getAppRoot().should('have.length', 1);
  });
});
