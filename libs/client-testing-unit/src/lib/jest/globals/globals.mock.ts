function setupGlobalFetchMock() {
  global.fetch = jest.fn().mockReturnValue(Promise.resolve<Response>({} as Response));
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
      observe: jest.fn(),
      takeRecords: jest.fn(),
      disconnect: jest.fn(),
    };
  }

  Object.defineProperty(global, 'MutationObserver', {
    value: mutationObserver,
    writable: false,
  });
}

export function setupJsdomGlobalMocks() {
  setupGlobalFetchMock();
  setupGlobalUrlMock();
  setupGlobalMutationObserverMock();
}
