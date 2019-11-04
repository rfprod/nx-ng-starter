import { MatcompArgs } from '../dto/matcomp.args';
import { Matcomp as MatcompModel } from '../model/matcomp.model';
import { NewMatcompInput } from './matcomp-new-input.interface';

/**
 * Matcomp query interface.
 */
export interface IMatcompQuery {
  findAll(args: MatcompArgs): Matcomp[];
  findOneById(id: string): Matcomp;
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
  constructor(input?: Matcomp | NewMatcompInput) {
    if (input) {
      this.id = input instanceof Matcomp ? input.id : this.id;
      this.name = input.name;
      this.description = input.description;
    }
  }
}
