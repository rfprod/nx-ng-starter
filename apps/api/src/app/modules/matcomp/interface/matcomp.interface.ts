import { NewMatcompInput as NewMatcompInputModel } from '../dto/new-matcomp.input';
import { Matcomp as MatcompModel } from '../model/matcomp.model';
import { MatcompArgs } from '../dto/matcomp.args';

/**
 * Matcomp query interface.
 */
export interface MatcompQuery {
  findAll: (args: MatcompArgs) => Matcomp[];
  findOneById: (id: string) => Matcomp;
}

/**
 * Matcomp mutation interface.
 */
export interface MatcompMutation {
  create: (id: NewMatcompInput) => Matcomp;
  remove: (id: string) => Matcomp;
}

export class MatcompSubscription {
  matcompCreated: Matcomp
}

/**
 * Matcomp interface with initialization.
 */
export class Matcomp implements MatcompModel {
  constructor(input?: Matcomp | NewMatcompInput) {
    if (input) {
      this.id = input instanceof Matcomp ? input.id : this.id;
      this.name = input.name;
      this.description = input.description;
    }
  }
  id: string = '';
  name: string = '';
  description: string = '';
}

/**
 * New matcomp interface with initialization.
 */
export class NewMatcompInput implements NewMatcompInputModel {
  constructor(input?: NewMatcompInput) {
    this.name = input.name;
    this.description = input.description;
  }
  name: string = '';
  description: string = '';
}
