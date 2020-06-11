import { LocalStorageMock } from '../local-storage/local-storage.mock';

function setupLocalStorageMock(): LocalStorageMock {
  Object.defineProperty(window, 'localStorage', {
    value: new LocalStorageMock(),
    writable: true,
  });
  const localStorage = window.localStorage;
  jest.spyOn(localStorage, 'setItem');
  jest.spyOn(localStorage, 'getItem');

  return localStorage;
}

function setupWindowMatchMediaMock() {
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  });
}

function setupWindowResizeToMock() {
  window.resizeTo = jest.fn().mockImplementation((width, height) => {
    return { width, height };
  });
}

function setupWindowGetComputedStyleMock() {
  Object.defineProperty(window, 'getComputedStyle', {
    value: () => {
      return {
        display: 'none',
        appearance: ['-webkit-appearance'],
        getPropertyValue: (): void => null,
      };
    },
  });
}

function setupWindowCreateObjectUrlMock() {
  Object.defineProperty(window.URL, 'createObjectURL', {
    value: jest.fn(),
    writable: true,
  });
}

export function setupJsdomWindowMocks() {
  setupLocalStorageMock();
  setupWindowMatchMediaMock();
  setupWindowResizeToMock();
  setupWindowGetComputedStyleMock();
  setupWindowCreateObjectUrlMock();
}
