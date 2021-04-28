import { TTestingDataPayload } from '../interfaces/testing-data.interface';
import { getTestingCredentials } from './commands/util/get-testing-credentials.command';
import { setTestingData } from './commands/util/set-testing-data.command';
import { setViewportSize } from './commands/util/set-viewport-size.command';
import { initializeTestingData } from './testing-data.config';

const testingDataSubject = initializeTestingData();

/**
 * Cypress custom commands.
 */
export const customCommands = {
  /**
   * Testing data snapshot getter.
   * @note utility function, do not remove;
   */
  getTestingData: () => {
    return cy.wrap<typeof testingDataSubject.value>(testingDataSubject.value);
  },
  /**
   * @note utility function, do not remove.
   */
  setTestingData: (payload: TTestingDataPayload) => setTestingData(testingDataSubject, payload),
  /**
   * @note utility function, do not remove.
   */
  setViewportSize: (options: { height?: number; widht?: number }) =>
    setViewportSize({ testingDataSubject, ...options }),
  /**
   * @note utility function, do not remove.
   */
  getTestingCredentials: getTestingCredentials,
  /**
   * @note Add testing commands below.
   */

  /**
   * @note Add testing commands above.
   */
};

export type TCypressCustomCommands = typeof cy & typeof customCommands;
