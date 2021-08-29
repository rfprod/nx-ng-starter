describe('home component', () => {
  beforeEach(() => cy.visit('/?path=/story/apphomepage--primary'));

  it('should render the component', () => {
    cy.get('app-diagnostics-home-page').should('exist');
  });
});
