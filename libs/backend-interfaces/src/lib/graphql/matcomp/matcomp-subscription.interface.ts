import { AppMatcomp } from './matcomp.interface';

export class AppMatcompSubscription {
  public matcomp?: AppMatcomp;

  constructor(input?: AppMatcomp) {
    if (typeof input !== 'undefined') {
      this.matcomp = input;
    }
  }
}
