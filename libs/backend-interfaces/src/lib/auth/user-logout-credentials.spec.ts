import { AppUserLogoutCredentials } from './user-logout-credentials';

describe('AppUserLogoutCredentials', () => {
  it('should initialize class properties as expected', () => {
    const raw = new AppUserLogoutCredentials();
    expect(raw.token).toEqual('');

    const initializer: AppUserLogoutCredentials = {
      token: 'test',
    };
    const initialized = new AppUserLogoutCredentials(initializer);
    expect(initialized.token).toEqual(initializer.token);
  });
});
