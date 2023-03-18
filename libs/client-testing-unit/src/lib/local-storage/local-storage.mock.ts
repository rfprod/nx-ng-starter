/**
 * Local storage mock for unit tests.
 */
export class AppLocalStorageMock {
  public getItem(key: string): unknown {
    return (<Record<string, unknown>>this)[key];
  }

  public setItem(key: string, value: string): void {
    const self = <Record<string, unknown>>this;
    self[key] = value;
  }

  public removeItem(key: string): void {
    const self = <Record<string, unknown>>this;
    self[key] = void 0;
  }
}
