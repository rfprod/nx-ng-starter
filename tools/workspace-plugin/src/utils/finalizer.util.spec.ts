import { promisify } from 'util';

import { finalizeGenerator } from './finalizer.util';

jest.mock('util', () => ({
  promisify: jest
    .fn()
    .mockImplementation((cmd: unknown) => (command: string) => new Promise(resolve => resolve({ stderr: '', stdout: '' }))),
  inherits: jest.fn(),
}));

describe('finalizer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should remove .eslintrc.json if it exists', async () => {
    await finalizeGenerator({ name: 'test' });
    const expectedCalls = 2;
    expect(promisify).toHaveBeenCalledTimes(expectedCalls);
  });
});
