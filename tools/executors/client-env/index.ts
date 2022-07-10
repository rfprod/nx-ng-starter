import { ExecutorContext } from '@nrwl/devkit';

import { AppClientEnvConfig } from './client-env';
import { IExecutorOptions } from './schema';

export default async function clientEnvExecutor(options: IExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
  const config = new AppClientEnvConfig(options, context);
  await config.execute();

  return { success: true };
}
