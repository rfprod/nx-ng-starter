import { Injectable } from '@nestjs/common';

import {
  Matcomp,
  MatcompQuery,
  MatcompMutation
} from '../interface/matcomp.interface';

import { MatcompArgs } from '../dto/matcomp.args';
import { NewMatcompInput } from '../dto/new-matcomp.input';

@Injectable()
export class MatcompService implements MatcompQuery, MatcompMutation {

  private readonly matcomps: Matcomp[] = [
    new Matcomp({
      id: '1',
      name: 'custom component',
      description: 'custom component description'
    } as Matcomp)
  ];

  public create(input: NewMatcompInput): Matcomp {
    const matcomp = new Matcomp(input);
    this.matcomps.push(matcomp);
    return matcomp;
  }

  public remove(id: string): Matcomp {
    let arrayId: number;
    this.matcomps.map((matcomp: Matcomp, index: number) => {
      if (matcomp.id === id) {
        arrayId = index;
      }
    });
    const matcomp = this.matcomps.splice(arrayId, 1)[0];
    return matcomp;
  }

  public findAll(args: MatcompArgs): Matcomp[] {
    return this.matcomps.slice(args.skip, args.take);
  }

  public findOneById(id: string): Matcomp {
    return this.matcomps.find(matcomp => matcomp.id === id);
  }

}
