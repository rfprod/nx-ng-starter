describe('setupJsdomGlobalMocks', () => {
  const consoleBackup = { ...console } as Console;

  it('setupJsdomGlobalMocks should override console,log an console.group methods', () => {
    const originalConsoleLogSpy = vi.spyOn(consoleBackup, 'log');
    const originalConsoleGroupSpy = vi.spyOn(consoleBackup, 'group');
    window.console.log('test');
    expect(originalConsoleLogSpy).not.toHaveBeenCalled();
    window.console.group('test');
    expect(originalConsoleGroupSpy).not.toHaveBeenCalled();
  });
});
