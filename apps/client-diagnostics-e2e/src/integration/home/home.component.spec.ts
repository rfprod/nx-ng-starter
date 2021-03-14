describe('home component', () => {
  beforeEach(() => cy.visit('/?path=/story/apphomepage--primary'));

  it('should render the component', () => {
    cy.get('app-home-page').should('exist');
  });
});
