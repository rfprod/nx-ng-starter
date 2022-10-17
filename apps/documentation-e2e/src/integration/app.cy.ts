import { TCypressCustomCommands } from '@app/client-testing-e2e';

declare const cy: TCypressCustomCommands;

describe('documentation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.setViewportSize('default');
  });

  it('should display welcome message', () => {
    // Function helper example, see `../support/app.po.ts` file
    cy.get('title').contains('Documentation');
  });
});
