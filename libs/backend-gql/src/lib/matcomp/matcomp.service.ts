import { Injectable } from '@nestjs/common';
import {
  IMatcompMutation,
  IMatcompQuery,
  Matcomp,
  MatcompArgs,
  NewMatcompInput,
} from '@nx-ng-starter/backend-interfaces';

@Injectable()
export class BackendMatcompService implements IMatcompQuery, IMatcompMutation {
  private readonly matcomps: Matcomp[] = [];

  public create(input: NewMatcompInput) {
    const matcomp = new Matcomp(input);
    this.matcomps.push(matcomp);
    return matcomp;
  }

  public remove(id: string) {
    let arrayId = 0;
    this.matcomps.map((comp: Matcomp, index: number) => {
      if (comp.id === id) {
        arrayId = index;
      }
    });
    const matcomp = this.matcomps.splice(arrayId, 1)[0];
    return matcomp;
  }

  public findAll(args: MatcompArgs) {
    return this.matcomps.slice(args.skip, args.take);
  }

  public findOneById(id: string) {
    return this.matcomps.find(matcomp => matcomp.id === id);
  }
}
