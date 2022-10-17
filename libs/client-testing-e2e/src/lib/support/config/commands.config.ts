import { getAppIndex } from '../commands/get-app-index.command';
import { getAppRoot } from '../commands/get-app-root.command';
import { getIframe } from '../commands/get-iframe.command';
import { getSidenav } from '../commands/get-sidnav.command';
import { getTestingCredentials } from '../commands/get-testing-credentials.command';
import { getBottomToolbar, getToolbars, getTopToolbar } from '../commands/get-toolbars.command';
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
  getAppRoot: getAppRoot,
  getAppIndex: getAppIndex,
  getIframe: getIframe,
  getSidenav: getSidenav,
  getToolbars: getToolbars,
  getTopToolbar: getTopToolbar,
  getBottomToolbar: getBottomToolbar,
  /**
   * @note Add testing commands above.
   */
};

export type TCypressCustomCommands = typeof cy & typeof customCommands;
