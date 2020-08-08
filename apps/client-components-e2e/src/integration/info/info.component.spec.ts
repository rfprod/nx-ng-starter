describe('client-components', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appinfocomponent--primary'));

  it('should render the component', () => {
    cy.get('app-info').should('exist');
  });
});
