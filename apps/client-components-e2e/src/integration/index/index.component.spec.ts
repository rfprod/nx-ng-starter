describe('client-components', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appindexcomponent--primary'));

  it('should render the component', () => {
    cy.get('app-index').should('exist');
  });
});
