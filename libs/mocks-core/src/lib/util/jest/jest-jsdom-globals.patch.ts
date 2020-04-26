/* eslint-disable compat/compat */
import { ETIMEOUT } from '@nx-ng-starter/shared-core/util';

import { setUpLocalStorageMock } from '../local-storage/local-storage.mock';

/**
 * Increase specs timeout.
 */
jest.setTimeout(ETIMEOUT.FOREVER);

/**
 * Sets up Jest global mocks
 * which should be used in each app and lib in test-setup.ts files.
 */
export const setupJestJsdomGlobalMocks: () => void = () => {
  /**
   * Set up local storage mock.
   */
  setUpLocalStorageMock();

  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  });

  window.resizeTo = jest.fn().mockImplementation((width, height) => {
    return { width, height };
  });

  Object.defineProperty(window, 'customElements', {
    value: {
      define: jest.fn(),
    },
    writable: false,
  });

  Object.defineProperty(window.URL, 'createObjectURL', {
    value: jest.fn(),
    writable: false,
  });

  Object.defineProperty(global, 'fetch', {
    value: jest.fn(async () => {
      const promise: Promise<unknown> = new Promise(resolve => {
        resolve();
      });
      return promise;
    }),
    writable: false,
  });

  Object.defineProperty(global, 'URL', {
    value: window.URL,
    writable: true,
  });

  Object.defineProperty(global, 'marked', {
    value: jest.fn((input: string) => `# mocked marked output ${input}`),
    writable: false,
  });

  /**
   * Override some console methods for testing environment.
   */
  window.console.log = (): void => null;
  window.console.group = (): void => null;
};
