import { Injectable } from '@nestjs/common';

import { IMatcompMutation, IMatcompQuery, Matcomp } from '../interface/matcomp.interface';

import { MatcompArgs } from '../dto/matcomp.args';
import { NewMatcompInput } from '../dto/new-matcomp.input';

@Injectable()
export class MatcompService implements IMatcompQuery, IMatcompMutation {
  private readonly matcomps: Matcomp[] = [
    new Matcomp({
      id: '1',
      name: 'custom component',
      description: 'custom component description',
    }),
  ];

  public create(input: NewMatcompInput): Matcomp {
    const matcomp = new Matcomp(input);
    this.matcomps.push(matcomp);
    return matcomp;
  }

  public remove(id: string): Matcomp {
    let arrayId: number;
    this.matcomps.map((comp: Matcomp, index: number) => {
      if (comp.id === id) {
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
