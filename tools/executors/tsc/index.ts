import { ExecutorContext, logger } from '@nrwl/devkit';
import { execSync } from 'child_process';

import { IExecutorOptions } from './schema';

export default async function tscCheck(options: IExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
  const projectName = context.projectName;

  if (typeof projectName === 'undefined') {
    logger.error(new Error('Project name is not defined.'));
    process.exit(1);
  }

  execSync(`tsc -p ${context.cwd}/${options.tsConfig}`, { stdio: 'inherit' });

  return { success: true };
}
