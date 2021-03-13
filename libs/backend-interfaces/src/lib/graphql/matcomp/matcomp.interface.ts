import { MatcompArgs } from './dto/matcomp.args';
import { MatcompModel } from './model/matcomp.model';
import { NewMatcompInput } from './new-matcomp-input.interface';

/**
 * Matcomp query interface.
 */
export interface IMatcompQuery {
  findAll(args: MatcompArgs): Matcomp[];
  findOneById(id: string): Matcomp | undefined;
}

/**
 * Matcomp mutation interface.
 */
export interface IMatcompMutation {
  create(id: NewMatcompInput): Matcomp;
  remove(id: string): Matcomp;
}

/**
 * Matcomp interface with initialization.
 */
export class Matcomp implements MatcompModel {
  public id = '';

  public name = '';

  public description = '';

  public creationDate = new Date().getTime();

  constructor(input?: Matcomp | NewMatcompInput) {
    if (typeof input !== 'undefined') {
      const keys = Object.keys(input);
      for (const key of keys) {
        this[key] = Boolean(input[key]) ? input[key] : this[key];
      }
    }
  }
}
