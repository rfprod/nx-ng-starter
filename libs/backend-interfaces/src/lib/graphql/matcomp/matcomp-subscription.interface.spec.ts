import { AppMatcomp } from './matcomp.interface';
import { AppMatcompSubscription } from './matcomp-subscription.interface';

describe('AppMatcompSubscription', () => {
  it('should initialize class properties as expected', () => {
    const raw = new AppMatcompSubscription();
    expect(raw.matcomp).toBeUndefined();

    const initializer: AppMatcompSubscription = {
      matcomp: new AppMatcomp(),
    };
    const initialized = new AppMatcompSubscription({ ...initializer });
    expect(initialized.matcomp).toEqual(initializer.matcomp);
  });
});
