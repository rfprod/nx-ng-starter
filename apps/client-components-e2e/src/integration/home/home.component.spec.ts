describe('client-components', () => {
  beforeEach(() => cy.visit('/iframe.html?id=apphomecomponent--primary'));

  it('should render the component', () => {
    cy.get('app-home').should('exist');
  });
});
