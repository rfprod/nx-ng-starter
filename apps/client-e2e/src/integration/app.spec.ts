import { COUNTER } from '@nx-ng-starter/client-util';

import {
  getAppIndex,
  getAppRoot,
  getBottomToolbar,
  getSidenav,
  getToolbars,
  getTopToolbar,
} from '../support/app.po';

describe('nx-ng-starter', () => {
  beforeEach(() => cy.visit('/'));

  it('should have one app-root html element', () => {
    getAppRoot().should('have.length', COUNTER.ONE);
  });

  it('should have one app-index html element', () => {
    getAppIndex().should('have.length', COUNTER.ONE);
  });

  it('should have two mat-toolbar html elements', () => {
    getToolbars().should('have.length', COUNTER.TWO);
  });

  it('first toolbar should have 6 buttons', () => {
    getTopToolbar().get('button').should('have.length', COUNTER.SIX);
  });

  it('last toolbar should have 6 buttons', () => {
    getBottomToolbar().get('button').should('have.length', COUNTER.SIX);
  });

  it('first toolbar button should trigger sidebar', () => {
    getSidenav().should('not.be.visible');
    getBottomToolbar().find('button').first().click();
    getSidenav().should('be.visible');
    getBottomToolbar().find('button').first().click();
    getSidenav().should('not.be.visible');
  });
});
