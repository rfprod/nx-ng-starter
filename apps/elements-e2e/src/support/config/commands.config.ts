import { getTestingCredentials } from '../commands/get-testing-credentials.command';
import { getViewportSizes } from '../commands/get-viewport-sizes.command';
import { setViewportSize } from '../commands/set-viewport-size.command';

/**
 * Cypress custom commands.
 */
export const customCommands = {
  /**
   * @note utility function, do not remove;
   */
  getViewportSizes: getViewportSizes,
  /**
   * @note utility function, do not remove.
   */
  setViewportSize: setViewportSize,
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
