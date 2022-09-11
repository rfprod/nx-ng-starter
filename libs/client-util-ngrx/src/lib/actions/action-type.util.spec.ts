import { actionType } from './action-type.util';

describe('actionType', () => {
  it('should process input as expected', () => {
    const featureName = 'testFeature';
    const actionName = 'testAction';
    const type = actionType(featureName, actionName);
    expect(type).toEqual(`[${featureName}] ${actionName}`);
  });
});
