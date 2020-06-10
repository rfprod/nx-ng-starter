/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ECOUNTER } from '@nx-ng-starter/shared-core/util';

import { getAppIndex, getAppRoot, getToolbar } from '../support/app.po';

describe('nx-ng-starter', () => {
  beforeEach(() => cy.visit('/'));

  it('should have one app-root html element', () => {
    getAppRoot().should('have.length', ECOUNTER.ONE);
  });

  it('should have one app-index html element', () => {
    getAppIndex().should('have.length', ECOUNTER.ONE);
  });

  it('should have two mat-toolbar html elements', () => {
    getToolbar().should('have.length', ECOUNTER.TWO);
  });
});
