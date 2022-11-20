import { initializeClassProperties } from '../../utils/class.util';
import { AppMatcompArgs } from './dto/matcomp.args';
import { AppMatcompInput } from './matcomp-input.interface';
import { AppMatcompModel } from './model/matcomp.model';

/**
 * Matcomp query interface.
 */
export interface IMatcompQuery {
  findAll(args: AppMatcompArgs): AppMatcomp[];
  findOneById(id: string): AppMatcomp | undefined;
}

/**
 * Matcomp mutation interface.
 */
export interface IMatcompMutation {
  create(id: AppMatcompInput): AppMatcomp;
  remove(id: string): AppMatcomp | undefined;
}

/**
 * Matcomp interface with initialization.
 */
export class AppMatcomp implements AppMatcompModel {
  public id = '';

  public name = '';

  public description = '';

  public creationDate = new Date();

  constructor(input?: AppMatcomp | AppMatcompInput) {
    initializeClassProperties<AppMatcomp | AppMatcompInput>(this, input);
  }
}
