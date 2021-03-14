describe('info component', () => {
  beforeEach(() => cy.visit('/?path=/story/appinfopage--primary'));

  it('should render the component', () => {
    cy.get('app-info-page').should('exist');
  });
});
