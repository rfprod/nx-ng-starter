import { AppMatcompInput } from './matcomp-input.interface';

describe('AppMatcompInput', () => {
  it('should initialize class properties as expected', () => {
    const raw = new AppMatcompInput();
    expect(raw.name).toEqual('');
    expect(raw.description).toEqual('');

    const initializer: AppMatcompInput = {
      name: 'test',
      description: 'test',
    };
    const initialized = new AppMatcompInput({ ...initializer });
    expect(initialized.name).toEqual(initializer.name);
    expect(initialized.description).toEqual(initializer.description);
  });
});
