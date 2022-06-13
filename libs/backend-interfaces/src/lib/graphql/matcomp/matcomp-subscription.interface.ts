import { initializeClassProperties } from '../../utils/class.util';
import { AppMatcomp } from './matcomp.interface';

export class AppMatcompSubscription {
  public matcomp?: AppMatcomp;

  constructor(input?: AppMatcompSubscription) {
    initializeClassProperties<AppMatcompSubscription>(this, input);
    // if (typeof input !== 'undefined') {
    //   this.matcomp = input;
    // }
  }
}
