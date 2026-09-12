import { joinPathFragments, logger } from '@nx/devkit';
import type { FsTree } from 'nx/src/generators/tree';

export const findFiles = (
  tree: FsTree,
  src: string,
  filter: '.html' | '.json' | string = '.html',
  result = { stderr: '', stdout: '' },
): { stderr: string; stdout: string } => {
  if (!tree.exists(src)) {
    const message = `Source directory ${src} does not exist`;
    logger.error(message);
    result.stderr = message;
    return result;
  }

  if (tree.isFile(src)) {
    const message = `Source directory ${src} is a file`;
    logger.error(message);
    result.stderr = message;
    return result;
  }

  const files = tree.children(src);
  for (let i = 0, max = files.length; i < max; i += 1) {
    const filePath = joinPathFragments(src, files[i]);
    if (!tree.isFile(filePath) && tree.exists(filePath)) {
      findFiles(tree, filePath, filter, result);
    } else if (filePath.endsWith(filter)) {
      result.stdout += result.stdout.length === 0 ? filePath : ` ${filePath}`;
    }
  }

  if (result.stdout.length === 0) {
    logger.info(`${src} does not contain ${filter} files.`);
  }

  return result;
};
