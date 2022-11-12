import { ExecutorContext } from '@nrwl/devkit';

import { AppBaseEnvConfig } from './env-base';
import { AppClientEnvConfig } from './env-client';
import { IExecutorOptions } from './schema';

/**
 * Configure client-env executor.
 * @param options executor options
 * @param context executor context
 * @returns execution result
 */
export default async function configure(options: IExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
  const app = options.app;
  let config: AppBaseEnvConfig | undefined;

  switch (app) {
    case 'client':
    case 'documentation':
    case 'elements':
      config = new AppClientEnvConfig(options, context);
      break;
    default:
      break;
  }

  if (typeof config !== 'undefined') {
    await config.execute();
  } else {
    throw new Error(`There was an error processing the app argument.\nIts value is: ${app}`);
  }

  return { success: true };
}
