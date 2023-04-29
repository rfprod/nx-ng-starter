import { ExecutorContext } from '@nx/devkit';
import { execFileSync } from 'child_process';
import path from 'path';

import { IExecutorOptions } from './schema';

export default async function check(options: IExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
  const projectName = context.projectName;

  if (typeof projectName === 'undefined') {
    throw new Error('Project name is not defined.');
  }

  execFileSync('tsc', ['-p', path.join(context.cwd, options.tsConfig)], {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: process.env,
    shell: true,
  });

  return { success: true };
}
