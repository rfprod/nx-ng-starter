import { AppUser } from './user';

describe('AppUser', () => {
  it('should initialize class properties as expected', () => {
    const raw = new AppUser();
    expect(raw.id).toEqual('');
    expect(raw.name).toEqual({
      first: '',
      last: '',
    });
    expect(raw.token).toEqual('');

    const initializer: AppUser = {
      id: 'test',
      name: {
        first: 'test',
        last: 'test',
      },
      token: 'test',
    };
    const initialized = new AppUser(initializer);
    expect(initialized.id).toEqual(initializer.id);
    expect(initialized.name).toEqual(initializer.name);
    expect(initialized.token).toEqual(initializer.token);
  });
});
