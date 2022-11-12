import { ExecutorContext, getProjects, logger } from '@nrwl/devkit';
import { execFileSync } from 'child_process';
import { FsTree } from 'nx/src/generators/tree';

import { IExecutorOptions } from './schema';
import { findScssFiles } from './utils/find-scss-files.util';

/**
 * Execute stylelint checks.
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

  const files = findScssFiles(tree, src);

  if (files.stdout.length > 0) {
    const input = files.stdout.split(' ');
    logger.log('files', input);
    const cmd = 'npx';
    const args =
      options.dryRun === true
        ? ['stylelint', '--config', options.config, '--custom-syntax', options.customSyntax ?? 'postcss-scss', ...input]
        : ['stylelint', '--config', options.config, '--custom-syntax', options.customSyntax ?? 'postcss-scss', '--fix', ...input];
    execFileSync(cmd, args, { stdio: 'inherit' });
  }

  if (files.stdout.length === 0 && files.stderr.length === 0) {
    logger.info(`${src} does not contain scss files.`);
  }

  return { success: files.stderr === '' };
}
