import { ExecutorContext } from '@nrwl/devkit';

import { AppBaseEnvConfig } from './env-base';
import { IExecutorOptions, TSupportedApp } from './schema';

interface IEnvConfig {
  version: string;
}

export class AppClientEnvConfig extends AppBaseEnvConfig<IEnvConfig> {
  protected supportedApps: TSupportedApp[] = ['client', 'documentation', 'elements'];

  constructor(options: IExecutorOptions, context: ExecutorContext) {
    super(options, context);
  }
}
