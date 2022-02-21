import { setupJsdomDocumentMocks } from './document.mock';

describe('setupJsdomDocumentMocks', () => {
  let definePropertySpy: jest.SpyInstance;

  beforeAll(() => {
    definePropertySpy = jest.spyOn(Object, 'defineProperty');
    setupJsdomDocumentMocks();
  });

  it('setupDocumentDoctypeMock should define 2 object properties for jest tests', () => {
    const expectedCalls = 2;
    expect(definePropertySpy).toHaveBeenCalledTimes(expectedCalls);
  });

  it('should set up expected document.body.style mock', () => {
    const query = document.body.style.transform as unknown as () => unknown;
    expect(query()).toEqual({
      enumerable: true,
      configurable: true,
    });
  });
});
