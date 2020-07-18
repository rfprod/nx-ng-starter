/**
 * Local storage mock for unit tests.
 */
export class AppLocalStorageMock {
  public getItem(key: string): unknown {
    return this[key];
  }

  public setItem(key: string, value: string): void {
    this[key] = value;
  }

  public removeItem(key: string): void {
    this[key] = void 0;
  }
}
