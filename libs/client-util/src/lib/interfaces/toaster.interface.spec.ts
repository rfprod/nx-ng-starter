import { toasterExtraClasses } from './toaster.interface';

describe('toasterExtraClasses', () => {
  it('should return correct extra classes based on input', () => {
    expect(toasterExtraClasses('')).toEqual([]);
    expect(toasterExtraClasses('primary')).toEqual(['primary-bg']);
    expect(toasterExtraClasses('warn')).toEqual(['warn-bg']);
    expect(toasterExtraClasses('accent')).toEqual(['accent-bg']);
    expect(toasterExtraClasses('error')).toEqual(['error-bg']);
    expect(toasterExtraClasses('success')).toEqual(['success-bg']);
  });
});
