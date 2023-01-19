import { ExecutorContext, getProjects, logger } from '@nrwl/devkit';
import { execFileSync } from 'child_process';
import { FsTree } from 'nx/src/generators/tree';

import { IExecutorOptions } from './schema';
import { findHtmlFiles } from './utils/find-html-files.util';

/**
 * Execute prettier checks.
 * @param options executor options
 * @param context executor context
 * @returns execution result
 */
export default async function check(options: IExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
  const projectName = context.projectName;

  if (typeof projectName === 'undefined') {
    throw new Error('Project name is not defined.');
  }

  const tree = new FsTree(context.root, false);
  const projects = getProjects(tree);
  const project = projects.get(projectName);
  if (typeof project === 'undefined') {
    throw new Error('Project does not exist.');
  }
  const src = project.sourceRoot;
  if (typeof src === 'undefined') {
    throw new Error('Project root does not exist.');
  }

  const files = findHtmlFiles(tree, src);

  if (files.stdout.length > 0) {
    const input = files.stdout.split(' ');
    logger.log('files', input);
    const cmd = 'npx';
    const args =
      options.dryRun === true
        ? ['prettier', '--config', options.config, '-c', ...input]
        : ['prettier', '--config', options.config, '-c', '--write', ...input];
    execFileSync(cmd, args, { stdio: 'inherit', cwd: process.cwd(), env: process.env, shell: true });
  }

  if (files.stdout.length === 0 && files.stderr.length === 0) {
    logger.info(`${src} does not contain html files.`);
  }

  return { success: files.stderr === '' };
}
