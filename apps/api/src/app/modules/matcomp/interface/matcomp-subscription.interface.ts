import { Matcomp } from './matcomp.interface';

export class MatcompSubscription {
  public matcomp: Matcomp;
  constructor(input?: Matcomp) {
    if (input) {
      this.matcomp = input;
    }
  }
}
