import type { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { defaultLibraryFilePaths, expectFileToExist } from '../testing/file-assertion.util';
import { defaultTestSetupIncludes } from '../testing/test-setup-assertion.util';
import { finalizeGenerator } from '../utils/finalizer.util';
import * as generator from './client-store.generator';
import type { ISchematicContext } from './schema.interface';

jest.mock('../utils/finalizer.util', () => ({
  finalizeGenerator: jest.fn().mockReturnValue(new Promise(resolve => resolve(null))),
}));

describe('client-store', () => {
  let tree: Tree;

  const context: ISchematicContext = {
    name: 'client-store-test',
    tags: `scope:client-store-test,type:data-access`,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    tree = createTreeWithEmptyWorkspace();
  });

  it('should throw error if a name is missing', async () => {
    const expected = 'The name must start with client-store- and contain only lower case letters and dashes.';
    await expect(generator.default(tree, { ...context, name: '' })).rejects.toThrowError(expected);
  });

  it('should throw error if a name has incorrect format', async () => {
    const expected = 'The name must start with client-store- and contain only lower case letters and dashes.';
    await expect(generator.default(tree, { ...context, name: 'store-client' })).rejects.toThrowError(expected);
  });

  it('should generate expected files and directories', async () => {
    const result = await generator.default(tree, context);

    const defaultFilesPaths = defaultLibraryFilePaths(context.name);
    for (let i = 0, max = defaultFilesPaths.length; i < max; i += 1) {
      const filePath = defaultFilesPaths[i];
      expectFileToExist(filePath, tree);
    }

    expectFileToExist(`/libs/${context.name}/src/index.ts`, tree);
    expectFileToExist(`/libs/${context.name}/src/test-setup.ts`, tree);

    const kebabCaseName = context.name.replace('client-store-', '');

    const barrel = tree.read(`/libs/${context.name}/src/index.ts`, 'utf-8');
    expect(barrel).toContain(`export * from './lib/${kebabCaseName}.actions';`);
    expect(barrel).toContain(`export * from './lib/${kebabCaseName}.interface';`);
    expect(barrel).toContain(`export * from './lib/${kebabCaseName}.module';`);
    expect(barrel).toContain(`export * from './lib/${kebabCaseName}.reducer';`);
    expect(barrel).toContain(`export * from './lib/${kebabCaseName}.selectors';`);

    const testSetup = tree.read(`/libs/${context.name}/src/test-setup.ts`, 'utf-8');
    const testSetupIncludes = defaultTestSetupIncludes();
    for (let i = 0, max = testSetupIncludes.length; i < max; i += 1) {
      const include = testSetupIncludes[i];
      expect(testSetup).toContain(include);
    }

    expectFileToExist(`/libs/${context.name}/src/lib/${kebabCaseName}.actions.ts`, tree);
    expectFileToExist(`/libs/${context.name}/src/lib/${kebabCaseName}.effects.spec.ts`, tree);
    expectFileToExist(`/libs/${context.name}/src/lib/${kebabCaseName}.effects.ts`, tree);
    expectFileToExist(`/libs/${context.name}/src/lib/${kebabCaseName}.interface.ts`, tree);
    expectFileToExist(`/libs/${context.name}/src/lib/${kebabCaseName}.module.ts`, tree);
    expectFileToExist(`/libs/${context.name}/src/lib/${kebabCaseName}.reducer.spec.ts`, tree);
    expectFileToExist(`/libs/${context.name}/src/lib/${kebabCaseName}.reducer.ts`, tree);
    expectFileToExist(`/libs/${context.name}/src/lib/${kebabCaseName}.selectors.ts`, tree);

    await result();

    expect(finalizeGenerator).toHaveBeenCalled();
  });
});
