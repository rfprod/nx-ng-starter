import { ExecutorContext, logger } from '@nrwl/devkit';

import { AppBaseEnvConfig } from './env-base';
import { AppClientEnvConfig } from './env-client';
import { IExecutorOptions } from './schema';

export default async function clientEnvExecutor(options: IExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
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
    const error = new Error(`There was an error processing the app argument.\nIts value is: ${app}`);
    logger.error(error);
    process.exit(1);
  }

  return { success: true };
}
