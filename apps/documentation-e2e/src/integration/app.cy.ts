import { getH1 } from '../support/app.po';

describe('documentation', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Function helper example, see `../support/app.po.ts` file
    getH1().contains('Nx Ng Starter');
  });
});
