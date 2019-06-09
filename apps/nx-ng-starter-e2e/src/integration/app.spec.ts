import { getGreeting } from '../support/app.po';

describe('nx-ng-starter', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to nx-ng-starter!');
  });
});
