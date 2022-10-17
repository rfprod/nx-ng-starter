import { TCypressCustomCommands } from '@app/client-testing-e2e';

declare const cy: TCypressCustomCommands;

describe('navbar component', () => {
  beforeEach(() => cy.visit('/?path=/story/appnavbarcomponent--primary'));

  it('TODO: test', () => {
    cy.getIframe().find('mat-toolbar').should('not.be.empty');
  });
});
