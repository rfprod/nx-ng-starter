import { elizaInitialConfig } from './eliza.config';

describe('eliza.config', () => {
  it('elizaInitialConfig should have specific object structure', () => {
    expect(elizaInitialConfig).toMatchObject({
      noRandom: expect.any(Boolean),
      capitalizeFirstLetter: expect.any(Boolean),
      debug: expect.any(Boolean),
      memSize: expect.any(Number),
    });
  });
});
