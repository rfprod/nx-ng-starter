import { getIframe } from '../../support/commands';

describe('home component', () => {
  beforeEach(() => cy.visit('/?path=/story/appdiagnosticshomepage--primary'));

  it('should render the component', () => {
    getIframe().find('div[id="root"]').should('not.be.empty');

    getIframe().find('storybook-dynamic-app-root').should('not.be.empty');

    getIframe().find('app-diagnostics-home-page').should('not.be.empty');
  });
});
