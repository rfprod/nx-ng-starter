import { TIMEOUT } from '@nx-ng-starter/shared-core/util';
import { setUpLocalStorageMock } from '../local-storage/local-storage.mock';

declare const jest;

/**
 * Increase specs timeout.
 */
jest.setTimeout(TIMEOUT.FOREVER);

/**
 * Sets up Jest global mocks
 * which should be used in each app and lib in test-setup.ts files.
 */
export const setupJestJsdomGlobalMocks: () => void = () => {
  /**
   * Set up local storage mock.
   */
  setUpLocalStorageMock();

  /**
   * Jest requirement, because it uses jsdom.
   */
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  });

  /**
   * Jest requirement, because it uses jsdom.
   */
  window.resizeTo = jest.fn().mockImplementation((width, height) => {
    return { width, height };
  });

  /**
   * Jest requires this mock.
   */
  Object.defineProperty(window, 'customElements', {
    value: {
      define: jest.fn(),
    },
    writable: false,
  });

  /**
   * Jest requires this mock.
   */
  Object.defineProperty(window.URL, 'createObjectURL', {
    value: jest.fn(),
    writable: false,
  });

  /**
   * Jest requires this mock.
   */
  Object.defineProperty(global, 'fetch', {
    value: jest.fn(async () => {
      const promise: Promise<any> = new Promise(resolve => {
        resolve();
      });
      return promise;
    }),
    writable: false,
  });

  /**
   * Jest requires this mock.
   */
  Object.defineProperty(global, 'URL', {
    value: window.URL,
    writable: true,
  });

  /**
   * Markdown global mock.
   */
  Object.defineProperty(global, 'marked', {
    value: jest.fn((input: string) => `# mocked marked output ${input}`),
    writable: false,
  });

  /**
   * Override some console methods for testing environment.
   */
  window.console.log = () => null;
  window.console.group = () => null;
};
