import { vi } from 'vitest';

function setupGlobalFetchMock() {
  global.fetch = vi.fn().mockReturnValue(Promise.resolve<Response>({} as Response));
}

function setupGlobalUrlMock() {
  Object.defineProperty(global, 'URL', {
    value: window.URL,
    writable: true,
  });
}

function setupGlobalMutationObserverMock() {
  function mutationObserver(...args: any[]) {
    return {
      observe: vi.fn(),
      takeRecords: vi.fn(),
      disconnect: vi.fn(),
    };
  }

  Object.defineProperty(global, 'MutationObserver', {
    value: mutationObserver,
    writable: false,
  });
}

export function setupGlobalMocks() {
  setupGlobalFetchMock();
  setupGlobalUrlMock();
  setupGlobalMutationObserverMock();
}
