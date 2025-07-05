import { promisify } from 'util';

import { finalizeGenerator } from './finalizer.util';

vi.mock('util', () => ({
  promisify: vi.fn().mockImplementation((cmd: unknown) => (command: string) => new Promise(resolve => resolve({ stderr: '', stdout: '' }))),
  inherits: vi.fn(),
}));

describe('finalizer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should remove .eslintrc.json if it exists', async () => {
    await finalizeGenerator({ name: 'test' });
    const expectedCalls = 2;
    expect(promisify).toHaveBeenCalledTimes(expectedCalls);
  });
});
