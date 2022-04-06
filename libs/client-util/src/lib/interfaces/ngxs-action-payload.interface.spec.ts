import { actionPayloadConstructor, IActionPayload } from './ngxs-action-payload.interface';

interface ITestData {
  test: 'value';
}

type TTestPayload = IActionPayload<ITestData>;

describe('actionPayloadConstructor', () => {
  it('actionPayloadConstructor should create an expected action', () => {
    const createAction = actionPayloadConstructor('test');
    const action = createAction<TTestPayload>('test');

    const payload: ITestData = {
      test: 'value',
    };
    const test = new action(payload);
    expect(test.payload).toEqual(payload);
  });
});
