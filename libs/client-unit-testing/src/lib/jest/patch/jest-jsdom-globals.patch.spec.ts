import { setupJestJsdomGlobalMocks } from './jest-jsdom-globals.patch';

describe('setupJestJsdomGlobalMocks', () => {
  const consoleBackup = <Console>{ ...console };
  let definePropertySpy: jest.SpyInstance;

  beforeAll(() => {
    definePropertySpy = jest.spyOn(Object, 'defineProperty');
    setupJestJsdomGlobalMocks();
  });

  it('setupJestJsdomGlobalMocks should define 8 object properties for jest tests and override console,log an console.group methods', () => {
    const expectedCalls = 9;
    expect(definePropertySpy).toHaveBeenCalledTimes(expectedCalls);
    const originalConsoleLogSpy = jest.spyOn(consoleBackup, 'log');
    const originalConsoleGroupSpy = jest.spyOn(consoleBackup, 'group');
    window.console.log('test');
    expect(originalConsoleLogSpy).not.toHaveBeenCalled();
    window.console.group('test');
    expect(originalConsoleGroupSpy).not.toHaveBeenCalled();
  });
});
