import { AppLocalStorageMock } from '../../local-storage/local-storage.mock';

function setupAppLocalStorageMock(): AppLocalStorageMock {
  Object.defineProperty(window, 'localStorage', {
    value: new AppLocalStorageMock(),
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
        getPropertyValue: (): void => void 0,
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
  setupAppLocalStorageMock();
  setupWindowMatchMediaMock();
  setupWindowResizeToMock();
  setupWindowGetComputedStyleMock();
  setupWindowCreateObjectUrlMock();
}
