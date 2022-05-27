import { getIframe } from '../../support/commands';

describe('info component', () => {
  beforeEach(() => cy.visit('/?path=/story/appdiagnosticsinfopage--primary'));

  it('should render the component', () => {
    getIframe().find('div[id="root"]').should('not.be.empty');

    getIframe().find('storybook-dynamic-app-root').should('not.be.empty');

    getIframe().find('app-diagnostics-info-page').should('not.be.empty');
  });
});
