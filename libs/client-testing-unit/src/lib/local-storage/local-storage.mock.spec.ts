import { AppLocalStorageMock } from './local-storage.mock';

describe('AppLocalStorageMock', () => {
  let mock: AppLocalStorageMock;

  beforeEach(() => {
    mock = new AppLocalStorageMock();
  });

  it('should be defined', () => {
    expect(mock).toBeDefined();
  });

  it('should have a getItem method', () => {
    expect(mock.getItem('test')).toBeUndefined();
  });

  it('should have a setItem method that returns true', () => {
    mock.setItem('test', 'test');
    expect(mock.getItem('test')).toEqual('test');
  });

  it('should have a removeItem method that returns true', () => {
    mock.setItem('test', 'test');
    expect(mock.getItem('test')).toEqual('test');
    mock.removeItem('test');
    expect(mock.getItem('test')).toBeUndefined();
  });
});
