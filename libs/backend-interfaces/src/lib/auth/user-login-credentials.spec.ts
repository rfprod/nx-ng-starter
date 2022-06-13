import { AppUserLoginCredentials } from './user-login-credentials';

describe('AppUserLoginCredentials', () => {
  it('should initialize class properties as expected', () => {
    const raw = new AppUserLoginCredentials();
    expect(raw.email).toEqual('');
    expect(raw.password).toEqual('');

    const initializer: AppUserLoginCredentials = {
      email: 'test',
      password: 'test',
    };
    const initialized = new AppUserLoginCredentials(initializer);
    expect(initialized.email).toEqual(initializer.email);
    expect(initialized.password).toEqual(initializer.password);
  });
});
