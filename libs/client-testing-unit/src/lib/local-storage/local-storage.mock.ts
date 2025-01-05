/**
 * Local storage mock for unit tests.
 */
export class AppLocalStorageMock {
  public getItem(key: string): unknown {
    return (this as Record<string, unknown>)[key];
  }

  public setItem(key: string, value: string): void {
    const self = this as Record<string, unknown>;
    self[key] = value;
  }

  public removeItem(key: string): void {
    const self = this as Record<string, unknown>;
    self[key] = void 0;
  }
}
