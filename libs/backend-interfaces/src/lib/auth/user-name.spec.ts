import { AppUserName } from './user-name';

describe('AppUserName', () => {
  it('should initialize class properties as expected', () => {
    const raw = new AppUserName();
    expect(raw.first).toEqual('');
    expect(raw.last).toEqual('');

    const initializer: AppUserName = {
      first: 'test',
      last: 'test',
    };
    const initialized = new AppUserName(initializer);
    expect(initialized.first).toEqual(initializer.first);
    expect(initialized.last).toEqual(initializer.last);
  });
});
