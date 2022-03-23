// import 'node_modules/jsdom/lib/jsdom/living/custom-elements/CustomElementRegistry-impl.js';

import { setupJsdomDocumentMocks } from '../document/document.mock';
import { setupJestExternalLibraryMocks } from '../external/external.mock';
import { setupJsdomGlobalMocks } from '../globals/globals.mock';
import { setupJsdomWindowMocks } from '../window/window.mock';

/**
 * Increase specs timeout.
 */
const timeout = 10000;
jest.setTimeout(timeout);

/**
 * Sets up Jest global mocks
 * which should be used in each app and lib in test-setup.ts files.
 */
export const setupJestJsdomGlobalMocks: () => void = () => {
  setupJsdomGlobalMocks();
  setupJsdomWindowMocks();
  setupJsdomDocumentMocks();
  setupJestExternalLibraryMocks();

  /**
   * Override some console methods for testing environment.
   */
  window.console.log = (): void => void 0;
  window.console.group = (): void => void 0;
};
