import { type ExecutorContext, getProjects, logger } from '@nx/devkit';
import { execFileSync } from 'child_process';
import { FsTree } from 'nx/src/generators/tree';

import type { IExecutorOptions } from './schema';
import { findFiles } from './utils/find-html-files.util';

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

  const htmlFiles = findFiles(tree, src);

  if (htmlFiles.stderr.length !== 0) {
    throw new Error(htmlFiles.stderr);
  }

  const jsonFiles = findFiles(tree, `${src}/..`, '.json');

  if (jsonFiles.stderr.length !== 0) {
    throw new Error(jsonFiles.stderr);
  }

  const files = `${htmlFiles.stdout} ${jsonFiles.stdout}`.trim();

  if (files.length > 0) {
    const input = files.split(' ');
    logger.log('files', input);
    const cmd = 'npx';
    const args =
      options.dryRun === true
        ? ['prettier', '--config', options.config, '-c', ...input]
        : ['prettier', '--config', options.config, '-c', '--write', ...input];
    execFileSync(cmd, args, { stdio: 'inherit', cwd: process.cwd(), env: process.env, shell: true });
  }

  return { success: htmlFiles.stderr === '' && jsonFiles.stderr === '' };
}
