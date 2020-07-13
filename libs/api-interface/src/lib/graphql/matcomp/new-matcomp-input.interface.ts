import { NewMatcompInputDto } from './dto/new-matcomp-input.dto';

export class NewMatcompInput implements NewMatcompInputDto {
  public name = '';

  public description = '';

  constructor(input?: NewMatcompInput) {
    if (typeof input !== 'undefined') {
      const keys = Object.keys(input);
      for (const key of keys) {
        this[key] = Boolean(input[key]) ? input[key] : this[key];
      }
    }
  }
}
