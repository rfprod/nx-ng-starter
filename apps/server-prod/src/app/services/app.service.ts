import { Inject, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import path from 'path';

import { APP_ENVIRONMENT, IServerProdEnvironment } from '../providers/environment.provider';

@Injectable()
export class AppService {
  constructor(@Inject(APP_ENVIRONMENT) private readonly env: IServerProdEnvironment) {}

  public clientIndexPath(): string {
    return this.env.production
      ? path.join(__dirname, '/dist/assets/index.html')
      : path.join(__dirname, '../', '../', '../', '/dist/apps/client/index.html');
  }

  public getClientIndex(): string {
    const filePath = this.clientIndexPath();
    let result = '';
    try {
      result = readFileSync(filePath).toString();
    } catch (e) {
      result = (<Error>e).message;
    }
    return result;
  }
}
