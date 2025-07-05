describe('setupDocumentMocks', () => {
  it('should set up expected document.body.style mock', () => {
    const query = document.body.style.transform as unknown as () => unknown;
    expect(query()).toEqual({
      enumerable: true,
      configurable: true,
    });
  });
});
