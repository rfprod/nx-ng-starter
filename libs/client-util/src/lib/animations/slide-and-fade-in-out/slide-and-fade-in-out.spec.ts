import { slideAndFadeInOut } from './slide-and-fade-in-out';

describe('slideAndFadeInOut', () => {
  it('should have expected metadata', () => {
    const animation = slideAndFadeInOut;
    expect(animation.name).toEqual('slideAndFadeInOut');
    const expectedDefinitions = 2;
    expect(animation.definitions.length).toEqual(expectedDefinitions);
  });
});
