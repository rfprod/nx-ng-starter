import { NewMatcompInputDto } from './dto/new-matcomp-input.dto';

export class NewMatcompInput implements NewMatcompInputDto {
  public name = '';

  public description = '';

  constructor(input?: NewMatcompInput) {
    const keys = Boolean(input) ? Object.keys(input) : [];
    for (const key of keys) {
      this[key] = Boolean(input[key]) ? input[key] : this[key];
    }
  }
}
