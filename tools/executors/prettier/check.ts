import { ExecutorContext, getProjects, joinPathFragments, logger } from '@nrwl/devkit';
import { execFileSync } from 'child_process';
import { FsTree } from 'nx/src/generators/tree';
import { directoryExists } from 'nx/src/utils/fileutils';

import { IExecutorOptions } from './schema';

const findHtmlFiles = (
  tree: FsTree,
  src: string,
  filter = '.html',
  result = { stderr: '', stdout: '' },
): { stderr: string; stdout: string } => {
  if (!directoryExists(src)) {
    logger.error(`Source directory ${src} does not exist`);
    result.stderr = `Source directory ${src} does not exist`;
    return result;
  }

  const files = tree.children(src);
  for (let i = 0, max = files.length; i < max; i += 1) {
    const filePath = joinPathFragments(src, files[i]);
    // const stat = lstatSync(filePath);
    if (!tree.isFile(filePath)) {
      findHtmlFiles(tree, filePath, filter, result);
    } else if (filePath.endsWith(filter)) {
      result.stdout += result.stdout.length === 0 ? filePath : ` ${filePath}`;
    }
  }
  return result;
};

export default async function prettierCheck(options: IExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
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
    execFileSync(cmd, args, { stdio: 'inherit' });
  }

  if (files.stdout.length === 0 && files.stderr.length === 0) {
    logger.info(`${src} does not contain html files.`);
  }

  return { success: files.stderr === '' };
}
