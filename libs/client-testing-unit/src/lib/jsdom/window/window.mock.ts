import { vi } from 'vitest';

import { AppLocalStorageMock } from '../../local-storage/local-storage.mock';

function setupWindowLocalStorageMock(): AppLocalStorageMock {
  Object.defineProperty(window, 'localStorage', {
    value: new AppLocalStorageMock(),
    writable: true,
  });
  const localStorage = window.localStorage;
  vi.spyOn(localStorage, 'setItem');
  vi.spyOn(localStorage, 'getItem');

  return localStorage;
}

function setupWindowMatchMediaMock() {
  window.matchMedia = vi.fn().mockImplementation(query => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    };
  });
}

function setupWindowResizeToMock() {
  window.resizeTo = vi.fn().mockImplementation((width, height) => {
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
    value: vi.fn().mockImplementation(() => 'this is mock'),
    writable: true,
  });
}

function setupWindowCssMock() {
  Object.defineProperty(window, 'CSS', { value: null });
}

export function setupWindowMocks() {
  setupWindowLocalStorageMock();
  setupWindowMatchMediaMock();
  setupWindowResizeToMock();
  setupWindowGetComputedStyleMock();
  setupWindowCreateObjectUrlMock();
  setupWindowCssMock();
}
