import { initializeClassProperties } from '../../utils/class.util';
import { AppMatcompInputDto } from './dto/new-matcomp-input.dto';

export class AppMatcompInput implements AppMatcompInputDto {
  public name = '';

  public description = '';

  constructor(input?: AppMatcompInput) {
    initializeClassProperties<AppMatcompInput>(this, input);
  }
}
