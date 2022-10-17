import { TCypressCustomCommands } from '@app/client-testing-e2e';

declare const cy: TCypressCustomCommands;

describe('nx-ng-starter', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.setViewportSize('default');
  });

  it('should have one app-root html element', () => {
    cy.getAppRoot().should('have.length', 1);
  });

  it('should have one app-diagnostics-index html element', () => {
    cy.getAppIndex().should('have.length', 1);
  });

  it('should have two mat-toolbar html elements', () => {
    const expectedLength = 2;
    cy.getToolbars().should('have.length', expectedLength);
  });

  it('first toolbar should have 11 buttons', () => {
    const expectedLength = 11;
    cy.getTopToolbar().get('button').should('have.length', expectedLength);
  });

  it('last toolbar should have 11 buttons', () => {
    const expectedLength = 11;
    cy.getBottomToolbar().get('button').should('have.length', expectedLength);
  });

  it('first toolbar button should trigger sidebar', () => {
    cy.getSidenav().should('not.be.visible');
    cy.getBottomToolbar().find('button').first().click({ force: true });
    cy.getSidenav().should('be.visible');
    cy.getBottomToolbar().find('button').first().click({ force: true });
    cy.getSidenav().should('not.be.visible');
  });
});
