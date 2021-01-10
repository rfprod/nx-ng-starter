import { COUNTER } from '@nx-ng-starter/client-util';

import { TCypressCustomCommands } from '../support/config/commands.config';

declare const cy: TCypressCustomCommands;

describe('nx-ng-starter', () => {
  beforeEach(() => cy.visit('/'));

  it('should have one app-root html element', () => {
    cy.getAppRoot().should('have.length', COUNTER.ONE);
  });

  it('should have one app-index html element', () => {
    cy.getAppIndex().should('have.length', COUNTER.ONE);
  });

  it('should have two mat-toolbar html elements', () => {
    cy.getToolbars().should('have.length', COUNTER.TWO);
  });

  it('first toolbar should have 6 buttons', () => {
    cy.getTopToolbar().get('button').should('have.length', COUNTER.SIX);
  });

  it('last toolbar should have 6 buttons', () => {
    cy.getBottomToolbar().get('button').should('have.length', COUNTER.SIX);
  });

  it('first toolbar button should trigger sidebar', () => {
    cy.getSidenav().should('not.be.visible');
    cy.getBottomToolbar().find('button').first().click();
    cy.getSidenav().should('be.visible');
    cy.getBottomToolbar().find('button').first().click();
    cy.getSidenav().should('not.be.visible');
  });
});
