import { existsSync, readdirSync } from 'fs';
import path from 'path';

/**
 * Find all JavaScript files in a directory.
 * @param tree the file system tree
 * @param src the source directory
 * @param filter the file extension filter, defaults to .html
 * @param result the execution result, is required for recursion, defaults to { stderr: '', stdout: '' }
 * @returns execution result
 */
export const findFiles = (src: string, filter = '.js', result = { stderr: '', stdout: '' }): { stderr: string; stdout: string } => {
  if (!existsSync(src)) {
    result.stderr = `Source directory ${src} does not exist`;
    return result;
  }

  const files = readdirSync(src);
  for (let i = 0, max = files.length; i < max; i += 1) {
    const filePath = path.join(src, files[i]);
    if (filePath.endsWith(filter)) {
      result.stdout += result.stdout.length === 0 ? filePath : ` ${filePath}`;
    }
  }
  return result;
};
