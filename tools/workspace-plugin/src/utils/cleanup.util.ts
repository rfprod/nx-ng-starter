import { unlink } from 'fs/promises';
import { fileExists } from 'nx/src/utils/fileutils';

/**
 * Removes unneeded files:
 * - .eslintrc.json
 */
export const cleanup = async (): Promise<void> => {
  const root = `${process.cwd()}`;
  const rootEslintJson = `${root}/.eslintrc.json`;

  const eslintJsonExists = fileExists(rootEslintJson);
  if (eslintJsonExists) {
    await unlink(rootEslintJson);
  }
};
