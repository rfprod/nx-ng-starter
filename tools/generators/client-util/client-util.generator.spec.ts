import type { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { defaultLibraryFilePaths, expectFileToExist } from '../testing/file-assertion.util';
import { defaultTestSetupIncludes } from '../testing/test-setup-assertion.util';
import { finalizeGenerator } from '../utils/finalizer.util';
import * as generator from './client-util.generator';
import type { ISchematicContext } from './schema.interface';

jest.mock('../utils/finalizer.util', () => ({
  finalizeGenerator: jest.fn().mockReturnValue(new Promise(resolve => resolve(null))),
}));

describe('client-util', () => {
  let tree: Tree;

  const context: ISchematicContext = {
    name: 'client-util-test',
    tags: `scope:client-util-test,type:util`,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    tree = createTreeWithEmptyWorkspace({
      layout: 'apps-libs',
    });
  });

  it('should throw error if a name is missing', async () => {
    const expected = 'The name must start with client-util- and contain only lower case letters and dashes.';
    await expect(generator.default(tree, { ...context, name: '' })).rejects.toThrowError(expected);
  });

  it('should throw error if a name has incorrect format', async () => {
    const expected = 'The name must start with client-util- and contain only lower case letters and dashes.';
    await expect(generator.default(tree, { ...context, name: 'util-client' })).rejects.toThrowError(expected);
  });

  const testTimeout = 10000;

  it(
    'should generate expected files and directories',
    async () => {
      const result = await generator.default(tree, context);

      const defaultFilesPaths = defaultLibraryFilePaths(context.name);
      for (let i = 0, max = defaultFilesPaths.length; i < max; i += 1) {
        const filePath = defaultFilesPaths[i];
        expectFileToExist(filePath, tree);
      }

      expectFileToExist(`/libs/${context.name}/src/index.ts`, tree);
      expectFileToExist(`/libs/${context.name}/src/test-setup.ts`, tree);

      const kebabCaseName = context.name.replace('client-util-', '');

      const barrel = tree.read(`/libs/${context.name}/src/index.ts`, 'utf-8');
      expect(barrel).toContain(`export * from './lib/${kebabCaseName}.module';`);

      const testSetup = tree.read(`/libs/${context.name}/src/test-setup.ts`, 'utf-8');
      const testSetupIncludes = defaultTestSetupIncludes().filter(item => item.includes('jest-preset-angular'));
      for (let i = 0, max = testSetupIncludes.length; i < max; i += 1) {
        const include = testSetupIncludes[i];
        expect(testSetup).toContain(include);
      }

      expectFileToExist(`/libs/${context.name}/src/lib/${kebabCaseName}.module.ts`, tree);

      await result();

      expect(finalizeGenerator).toHaveBeenCalled();
    },
    testTimeout,
  );
});
