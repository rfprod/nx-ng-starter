import { AppMatcomp, AppMatcompArgs, AppMatcompInput, IMatcompMutation, IMatcompQuery } from '@app/backend-interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppMatcompService implements IMatcompQuery, IMatcompMutation {
  private readonly matcomps: AppMatcomp[] = [];

  public create(input: AppMatcompInput) {
    const matcomp = new AppMatcomp({ ...input, id: this.matcomps.length.toString() });
    this.matcomps.push(matcomp);
    return matcomp;
  }

  public remove(id: string) {
    const arrayId = this.matcomps.findIndex((comp: AppMatcomp) => comp.id === id);
    return arrayId !== -1 ? this.matcomps.splice(arrayId, 1)[0] : void 0;
  }

  public findAll(args: AppMatcompArgs) {
    return this.matcomps.slice(args.skip, args.take);
  }

  public findOneById(id: string) {
    return this.matcomps.find(matcomp => matcomp.id === id);
  }
}
