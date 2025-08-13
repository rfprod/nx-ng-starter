import { setupDocumentMocks } from '../document/document.mock';
import { setupExternalLibraryMocks } from '../external/external.mock';
import { setupGlobalMocks } from '../globals/globals.mock';
import { setupWindowMocks } from '../window/window.mock';

/**
 * Sets up  global mocks
 * which should be used in each app and lib in test-setup.ts files.
 */
export const setupJsdomGlobalMocks: () => void = () => {
  setupGlobalMocks();
  setupWindowMocks();
  setupDocumentMocks();
  setupExternalLibraryMocks();

  /**
   * Override some console methods for testing environment.
   */
  window.console.log = (): void => void 0;
  window.console.group = (): void => void 0;
};
