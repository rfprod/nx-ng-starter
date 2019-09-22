/**
 * Local storage mock for unit tests.
 */
export class LocalStorageMock {
  public getItem(key: string): any {
    return this[key] ? this[key] : undefined;
  }

  public setItem(key: string, value: string): void {
    this[key] = value;
  }

  public removeItem(key: string): void {
    this[key] = undefined;
  }
}

declare let jest: any;

export function setUpLocalStorageMock(): LocalStorageMock {
  Object.defineProperty(window, 'localStorage', {
    value: new LocalStorageMock(),
    writable: true,
  });
  const localStorage = window.localStorage;
  jest.spyOn(localStorage, 'setItem');
  jest.spyOn(localStorage, 'getItem');

  return localStorage;
}
