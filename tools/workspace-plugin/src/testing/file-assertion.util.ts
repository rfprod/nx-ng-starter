import type { Tree } from '@nx/devkit';
import { expect } from 'vitest';

/**
 * Generates an array with the default set of files in a library.
 * @param name library name
 */
export const defaultLibraryFilePaths = (name: string) => [
  `/libs/${name}/eslint.config.mjs`,
  `/libs/${name}/vite.config.mts`,
  `/libs/${name}/vitest.config.mts`,
  `/libs/${name}/README.md`,
  `/libs/${name}/tsconfig.eslint.json`,
  `/libs/${name}/tsconfig.json`,
  `/libs/${name}/tsconfig.lib.json`,
  `/libs/${name}/tsconfig.spec.json`,
];

/**
 * File existence assertion.
 * @param file file path
 * @param tree AST tree
 */
export const expectFileToExist = (file: string, tree: Tree) => expect(tree.exists(file), `Does not exist ${file}`).toBeTruthy();
