import { Tree } from '@nrwl/devkit';

/**
 * Generates an array with the default set of files in a library.
 * @param name library name
 */
export const defaultLibraryFilePaths = (name: string) => [
  `/libs/${name}/.eslintrc.json`,
  `/libs/${name}/jest.config.ts`,
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
export const expectFileToExist = (file: string, tree: Tree) => expect(tree.exists(file)).toBeTruthy();
