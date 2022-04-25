import { AppMatcomp, AppMatcompArgs, AppMatcompInput, IMatcompMutation, IMatcompQuery } from '@app/backend-interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppMatcompService implements IMatcompQuery, IMatcompMutation {
  private readonly matcomps: AppMatcomp[] = [];

  public create(input: AppMatcompInput) {
    const matcomp = new AppMatcomp(input);
    this.matcomps.push(matcomp);
    return matcomp;
  }

  public remove(id: string) {
    let arrayId = 0;
    this.matcomps.map((comp: AppMatcomp, index: number) => {
      if (comp.id === id) {
        arrayId = index;
      }
    });
    const matcomp = this.matcomps.splice(arrayId, 1)[0];
    return matcomp;
  }

  public findAll(args: AppMatcompArgs) {
    return this.matcomps.slice(args.skip, args.take);
  }

  public findOneById(id: string) {
    return this.matcomps.find(matcomp => matcomp.id === id);
  }
}
