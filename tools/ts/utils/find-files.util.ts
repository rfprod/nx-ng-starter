import { joinPathFragments, logger } from '@nx/devkit';
import type { FsTree } from 'nx/src/generators/tree';
import { directoryExists } from 'nx/src/utils/fileutils';

export const findFiles = (tree: FsTree, src: string, filter: '.html' | '.json' | string = '.html', result = { stderr: '', stdout: '' }) => {
  if (!directoryExists(src)) {
    const message = `Source directory ${src} does not exist`;
    logger.error(message);
    result.stderr = message;
    return result;
  }

  const files = tree.children(src);
  for (let i = 0, max = files.length; i < max; i += 1) {
    const filePath = joinPathFragments(src, files[i]);
    if (!tree.isFile(filePath)) {
      findFiles(tree, filePath, filter, result);
    } else if (filePath.endsWith(filter)) {
      result.stdout += result.stdout.length === 0 ? filePath : ` ${filePath}`;
    }
  }

  if (result.stdout.length === 0) {
    logger.info(`${src} does not container ${filter} files.`);
  }

  return result;
};
