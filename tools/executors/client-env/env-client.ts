import { ExecutorContext } from '@nrwl/devkit';

import { AppBaseEnvConfig } from './env-base';
import { IExecutorOptions, TSupportedApp } from './schema';

/**
 * Environment configurator for applications:
 * - client
 * - documentation
 * - elements
 */
export class AppClientEnvConfig extends AppBaseEnvConfig {
  public readonly supportedApps: TSupportedApp[] = ['client', 'documentation', 'elements'];

  constructor(options: IExecutorOptions, context: ExecutorContext) {
    super(options, context);
  }
}
