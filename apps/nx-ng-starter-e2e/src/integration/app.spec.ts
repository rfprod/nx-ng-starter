import { COUNTER } from '@nx-ng-starter/shared-core/util';
import { getAppIndex, getAppRoot, getToolbar } from '../support/app.po';

describe('nx-ng-starter', () => {
  beforeEach(() => cy.visit('/'));

  it('should have one nx-ng-starter-root html element', () => {
    getAppRoot().should('have.length', COUNTER.ONE);
  });

  it('should have one nx-ng-starter-app-index html element', () => {
    getAppIndex().should('have.length', COUNTER.ONE);
  });

  it('should have two mat-toolbar html elements', () => {
    getToolbar().should('have.length', COUNTER.TWO);
  });
});
