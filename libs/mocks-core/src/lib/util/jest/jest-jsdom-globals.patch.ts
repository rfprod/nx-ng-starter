import { ETIMEOUT } from '@nx-ng-starter/shared-core/util';

import { setupJsdomGlobalMocks } from '../globals/globals.mock';
import { setupLocalStorageMock } from '../local-storage/local-storage.mock';
import { setupJsdomWindowMocks } from '../window/window.mock';

/**
 * Increase specs timeout.
 */
jest.setTimeout(ETIMEOUT.FOREVER);

/**
 * Sets up Jest global mocks
 * which should be used in each app and lib in test-setup.ts files.
 */
export const setupJestJsdomGlobalMocks: () => void = () => {
  setupLocalStorageMock();

  setupJsdomWindowMocks();

  setupJsdomGlobalMocks();

  /**
   * Override some console methods for testing environment.
   */
  window.console.log = (): void => null;
  window.console.group = (): void => null;
};
