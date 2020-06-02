import { Matcomp } from './matcomp.interface';

export class MatcompSubscription {
  public matcomp: Matcomp;

  constructor(input?: Matcomp) {
    if (Boolean(input)) {
      this.matcomp = input;
    }
  }
}
