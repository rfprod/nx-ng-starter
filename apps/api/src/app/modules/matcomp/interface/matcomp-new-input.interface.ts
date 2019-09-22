import { NewMatcompInput as NewMatcompInputModel } from '../dto/new-matcomp.input';

export class NewMatcompInput implements NewMatcompInputModel {
  public name = '';
  public description = '';
  constructor(input?: NewMatcompInput) {
    this.name = input.name;
    this.description = input.description;
  }
}
