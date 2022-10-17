import { TCypressCustomCommands } from '@app/client-testing-e2e';

declare const cy: TCypressCustomCommands;

describe('info component', () => {
  beforeEach(() => cy.visit('/?path=/story/appdiagnosticsinfopage--primary'));

  it('should render the component', () => {
    cy.getIframe().find('div[id="root"]').should('not.be.empty');

    cy.getIframe().find('storybook-dynamic-app-root').should('not.be.empty');

    cy.getIframe().find('app-diagnostics-info-page').should('not.be.empty');
  });
});
