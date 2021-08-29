describe('info component', () => {
  beforeEach(() => cy.visit('/?path=/story/appinfopage--primary'));

  it('should render the component', () => {
    cy.get('app-diagnostics-info-page').should('exist');
  });
});
