import { Matcomp } from './matcomp.interface';

export class MatcompSubscription {
  public matcomp?: Matcomp;

  constructor(input?: Matcomp) {
    if (typeof input !== 'undefined') {
      this.matcomp = input;
    }
  }
}
