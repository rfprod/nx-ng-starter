import { ExecutorContext } from '@nrwl/devkit';
import { execFileSync } from 'child_process';
import path from 'path';

import { IExecutorOptions } from './schema';

export default async function tscCheck(options: IExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
  const projectName = context.projectName;

  if (typeof projectName === 'undefined') {
    throw new Error('Project name is not defined.');
  }

  execFileSync('tsc', ['-p', path.join(context.cwd, options.tsConfig)], { stdio: 'inherit' });

  return { success: true };
}
