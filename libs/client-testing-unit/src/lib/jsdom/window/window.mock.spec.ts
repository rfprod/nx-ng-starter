import { setupWindowMocks } from './window.mock';

describe('setupWindowMocks', () => {
  beforeAll(() => {
    setupWindowMocks();
  });

  it('should set up expected matchMedia mock', () => {
    const queryText = 'query';
    const query = window.matchMedia(queryText);
    expect(query.matches).toBeFalsy();
    expect(query.media).toEqual(queryText);
  });

  it('should set up expected resizeTo mock', () => {
    const width = 1280;
    const height = 1024;
    const query = window.resizeTo(width, height);
    expect(query).toEqual({ width, height });
  });

  it('should set up expected getComputedStyle mock', () => {
    const el = document.createElement('div');
    const query = window.getComputedStyle(el);
    expect(query.display).toEqual('none');
    expect(query.appearance).toEqual(['-webkit-appearance']);
    expect(query.getPropertyValue('test')).toEqual(void 0);
  });

  it('should set up expected createObjectURL mock', () => {
    const query = window.URL.createObjectURL(new Blob());
    expect(query).toEqual('this is mock');
  });
});
