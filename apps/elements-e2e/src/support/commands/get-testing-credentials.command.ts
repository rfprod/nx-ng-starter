import { ITestingCredentials } from '../interfaces/testing-credentials.interface';

/**
 * Gets testing creadentials from fixture.
 */
export const getTestingCredentials = () => {
  return cy.fixture('./testing-credentials.json').then((credentials: ITestingCredentials) => credentials);
};
