import type { ExecutorContext } from '@nx/devkit';
import { execFileSync } from 'child_process';
import path from 'path';

import type { IExecutorOptions } from './schema';

export default async function check(options: IExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
  const projectName = context.projectName;

  if (typeof projectName === 'undefined') {
    throw new Error('Project name is not defined.');
  }

  const tsConfigPath = path.join(context.cwd, options.tsConfig);

  execFileSync('tsc', ['-b', tsConfigPath], {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: process.env,
    shell: true,
  });

  execFileSync('rm', ['-rf', path.join(context.cwd, options.tsConfig.replace(/tsconfig\.[a-z]+\.json/, ''), '**/', '*.js')], {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: process.env,
    shell: true,
  });

  execFileSync('rm', ['-rf', path.join(context.cwd, options.tsConfig.replace(/tsconfig\.[a-z]+\.json/, ''), '**/', '*.d.ts')], {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: process.env,
    shell: true,
  });

  execFileSync('rm', ['-rf', path.join(context.cwd, options.tsConfig.replace(/tsconfig\.[a-z]+\.json/, ''), '**/', '*.d.ts.map')], {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: process.env,
    shell: true,
  });

  return { success: true };
}
