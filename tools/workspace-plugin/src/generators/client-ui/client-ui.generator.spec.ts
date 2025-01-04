import { libraryGenerator } from '@nx/angular/generators';
import type { Schema } from '@nx/angular/src/generators/library/schema';
import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { defaultLibraryFilePaths, expectFileToExist } from '../../testing/file-assertion.util';
import { defaultTestSetupIncludes } from '../../testing/test-setup-assertion.util';
import { finalizeGenerator } from '../../utils/finalizer.util';
import * as generator from './client-ui.generator';
import type { ISchematicContext } from './schema.interface';

jest.mock('../../utils/finalizer.util', () => ({
  finalizeGenerator: jest.fn().mockImplementation(() => new Promise(resolve => resolve({ success: true }))),
}));

jest.mock('../../utils/project-configuration.util', () => ({
  updateProjectLinterConfig: jest.fn().mockImplementation(() => void 0),
}));

jest.mock('@nx/angular/generators', () => ({
  libraryGenerator: jest.fn().mockImplementation((tree: Tree, schema: Schema) => {
    const p = new Promise(resolve => {
      const path = `libs/${schema.name}/project.json`;
      tree.write(path, '{}');
      resolve(void 0);
    });
    return p;
  }),
}));

describe('client-ui', () => {
  let tree: Tree;

  const context: ISchematicContext = {
    name: 'client-test',
    tags: `scope:client-test,type:ui`,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    tree = createTreeWithEmptyWorkspace({
      layout: 'apps-libs',
    });
  });

  it('should throw error if a name is missing', async () => {
    const expected = 'The name must start with client- and contain only lower case letters and dashes.';
    await expect(generator.default(tree, { ...context, name: '' })).rejects.toThrow(expected);
  });

  it('should throw error if a name has incorrect format', async () => {
    const expected = 'The name must start with client- and contain only lower case letters and dashes.';
    await expect(generator.default(tree, { ...context, name: 'ui-client' })).rejects.toThrow(expected);
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

      const kebabCaseName = context.name.replace('client-', '');

      const barrel = tree.read(`/libs/${context.name}/src/index.ts`, 'utf-8');
      expect(barrel).toContain(`export * from './lib/${kebabCaseName}.module';`);

      const testSetup = tree.read(`/libs/${context.name}/src/test-setup.ts`, 'utf-8');
      const testSetupIncludes = defaultTestSetupIncludes();
      for (let i = 0, max = testSetupIncludes.length; i < max; i += 1) {
        const include = testSetupIncludes[i];
        expect(testSetup).toContain(include);
      }

      expectFileToExist(`/libs/${context.name}/src/lib/${kebabCaseName}.module.ts`, tree);

      expectFileToExist(`/libs/${context.name}/src/lib/components/${kebabCaseName}/${kebabCaseName}.component.html`, tree);
      expectFileToExist(`/libs/${context.name}/src/lib/components/${kebabCaseName}/${kebabCaseName}.component.scss`, tree);
      expectFileToExist(`/libs/${context.name}/src/lib/components/${kebabCaseName}/${kebabCaseName}.component.spec.ts`, tree);
      expectFileToExist(`/libs/${context.name}/src/lib/components/${kebabCaseName}/${kebabCaseName}.component.ts`, tree);

      await result();

      expect(libraryGenerator).toHaveBeenCalled();

      expect(finalizeGenerator).toHaveBeenCalled();
    },
    testTimeout,
  );
});
