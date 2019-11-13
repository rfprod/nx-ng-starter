import { NewMatcompInputDto } from './dto/new-matcomp-input.dto';

export class NewMatcompInput implements NewMatcompInputDto {
  public name = '';
  public description = '';
  constructor(input?: NewMatcompInput) {
    if (input) {
      this.name = input.name;
      this.description = input.description;
    }
  }
}
