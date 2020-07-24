import { COUNTER } from '@nx-ng-starter/client-util';

import { getAppIndex, getAppRoot, getToolbar } from '../support/app.po';

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
});
