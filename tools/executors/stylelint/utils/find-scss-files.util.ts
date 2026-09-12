import { joinPathFragments, logger } from '@nx/devkit';
import type { FsTree } from 'nx/src/generators/tree';

/**
 * Recursively find all scss files in a directory and its subdirectories.
 * @param tree file system tree
 * @param src source directory
 * @param filter file extension filter, defaults to .scss
 * @param result execution result, required for recursion, defaults to { stderr: '', stdout: '' }
 * @returns execution result
 */
export const findScssFiles = (
  tree: FsTree,
  src: string,
  filter = '.scss',
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
      findScssFiles(tree, filePath, filter, result);
    } else if (filePath.endsWith(filter)) {
      result.stdout += result.stdout.length === 0 ? filePath : ` ${filePath}`;
    }
  }
  return result;
};
