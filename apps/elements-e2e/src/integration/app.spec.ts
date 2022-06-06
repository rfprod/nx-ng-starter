import { TCypressCustomCommands } from '../support/config/commands.config';

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
