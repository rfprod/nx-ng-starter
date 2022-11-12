import { joinPathFragments, logger } from '@nrwl/devkit';
import { FsTree } from 'nx/src/generators/tree';
import { directoryExists } from 'nx/src/utils/fileutils';

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
  if (!directoryExists(src)) {
    logger.error(`Source directory ${src} does not exist`);
    result.stderr = `Source directory ${src} does not exist`;
    return result;
  }

  const files = tree.children(src);
  for (let i = 0, max = files.length; i < max; i += 1) {
    const filePath = joinPathFragments(src, files[i]);
    if (!tree.isFile(filePath)) {
      findScssFiles(tree, filePath, filter, result);
    } else if (filePath.endsWith(filter)) {
      result.stdout += result.stdout.length === 0 ? filePath : ` ${filePath}`;
    }
  }
  return result;
};
