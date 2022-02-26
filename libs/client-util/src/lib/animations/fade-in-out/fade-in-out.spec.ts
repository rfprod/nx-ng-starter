import { fadeInOut } from './fade-in-out';

describe('fadeInOut', () => {
  it('should have expected metadata', () => {
    const animation = fadeInOut;
    expect(animation.name).toEqual('fadeInOut');
    const expectedDefinitions = 2;
    expect(animation.definitions.length).toEqual(expectedDefinitions);
  });
});
