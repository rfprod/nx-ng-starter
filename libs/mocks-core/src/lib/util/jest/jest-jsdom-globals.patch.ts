declare const jest;

/**
 * Sets up Jest global mocks
 * which should be used in each app and lib in test-setup.ts files.
 */
export const setupJestJsdomGlobalMocks: () => void = () => {
  /**
   * Jest requirement, because it uses jsdom.
   */
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
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
  Object.defineProperty(window.URL, 'createObjectURL', {
    value: jest.fn(),
    writable: false
  });

  /**
   * Jest requires this mock.
   */
  Object.defineProperty(global, 'fetch', {
    value: jest.fn(() => new Promise(resolve => resolve())),
    writable: false
  });

  /**
   * Jest requires this mock.
   */
  Object.defineProperty(global, 'URL', {
    value: window.URL,
    writable: true
  });

  /**
   * Markdown global mock.
   */
  Object.defineProperty(global, 'marked', {
    value: jest.fn((input: string) => `# mocked marked output ${input}`),
    writable: false
  });

};
