import { ExecutorContext } from '@nrwl/devkit';
import { execSync } from 'child_process';

import { IExecutorOptions } from './schema';

export default async function tscCheck(options: IExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
  const projectName = context.projectName;

  if (typeof projectName === 'undefined') {
    throw new Error('Project name is not defined.');
  }

  execSync(`tsc -p ${context.cwd}/${options.tsConfig}`, { stdio: 'inherit' });

  return { success: true };
}
