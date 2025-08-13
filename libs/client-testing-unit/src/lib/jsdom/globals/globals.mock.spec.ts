describe('setupGlobalMocks', () => {
  it('should set up expected global.URL value', () => {
    const query = global.URL;
    expect(query).toEqual(window.URL);
  });

  it('should set up expected fetch mock', async () => {
    const query = await window.fetch('test');
    expect(query).toEqual({});
  });

  it('should set up expected mutationObserver mock', () => {
    const observer = new MutationObserver(() => void 0);
    expect(observer.observe).toEqual(expect.any(Function));
    expect(observer.takeRecords).toEqual(expect.any(Function));
    expect(observer.disconnect).toEqual(expect.any(Function));
  });
});
