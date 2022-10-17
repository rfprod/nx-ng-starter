import { TCypressCustomCommands } from '@app/client-testing-e2e';

declare const cy: TCypressCustomCommands;

describe('elements', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.setViewportSize('default');
  });

  it('TODO', () => {
    expect(true).to.eq(true);
  });
});
