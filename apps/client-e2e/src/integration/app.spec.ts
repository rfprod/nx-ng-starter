import { COUNTER } from '@nx-ng-starter/client-util';

import { getAppIndex, getAppRoot, getSidenav, getToolbar } from '../support/app.po';

describe('nx-ng-starter', () => {
  beforeEach(() => cy.visit('/'));

  it('should have one app-root html element', () => {
    getAppRoot().should('have.length', COUNTER.ONE);
  });

  it('should have one app-index html element', () => {
    getAppIndex().should('have.length', COUNTER.ONE);
  });

  it('should have two mat-toolbar html elements', () => {
    getToolbar().should('have.length', COUNTER.TWO);
  });

  it('first toolbar should have 7 buttons', () => {
    getToolbar().first().get('button').should('have.length', COUNTER.SEVEN);
  });

  it('last toolbar should have 7 buttons', () => {
    getToolbar().last().get('button').should('have.length', COUNTER.SEVEN);
  });

  it('first toolbar button should trigger sidebar', () => {
    getSidenav().should('not.be.visible');
    getToolbar().last().get('button').first().click();
    getSidenav().should('be.visible');
    getToolbar().last().get('button').first().click();
    getSidenav().should('not.be.visible');
  });
});
