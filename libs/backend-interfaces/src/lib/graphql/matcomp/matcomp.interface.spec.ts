import { AppMatcomp } from './matcomp.interface';

describe('AppMatcomp', () => {
  it('should initialize class properties as expected', () => {
    const raw = new AppMatcomp();
    expect(raw.id).toEqual('');
    expect(raw.name).toEqual('');
    expect(raw.description).toEqual('');
    expect(raw.creationDate instanceof Date).toBeTruthy();

    const initializer: AppMatcomp = {
      id: 'test',
      name: 'test',
      description: 'test',
      creationDate: new Date(),
    };
    const initialized = new AppMatcomp(initializer);
    expect(initialized.id).toEqual(initializer.id);
    expect(initialized.name).toEqual(initializer.name);
    expect(initialized.description).toEqual(initializer.description);
    expect(initialized.creationDate).toEqual(initializer.creationDate);
  });
});
