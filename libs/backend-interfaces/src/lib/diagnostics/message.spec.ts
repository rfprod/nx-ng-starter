import { AppMessage } from './message';

describe('AppMessage', () => {
  it('should initialize class properties as expected', () => {
    const raw = new AppMessage();
    expect(raw.message).toEqual('');

    const initializer: AppMessage = {
      message: 'test',
    };
    const initialized = new AppMessage(initializer);
    expect(initialized.message).toEqual(initializer.message);
  });
});
