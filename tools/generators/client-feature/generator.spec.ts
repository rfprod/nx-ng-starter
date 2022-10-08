import type { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import * as generator from './generator';
import type { ISchematicContext } from './schema.interface';

jest.mock('child_process', () => ({
  exec: jest.fn().mockReturnValue({}),
}));

describe('client-feature', () => {
  let tree: Tree;

  const context: ISchematicContext = {
    name: 'client-test',
    tags: `scope:client-test,type:feature`,
  };

  const expectFileToExist = (file: string) => expect(tree.exists(file)).toBeTruthy();

  beforeEach(() => {
    jest.clearAllMocks();
    tree = createTreeWithEmptyWorkspace();
  });

  it('should throw error if a name is missing', async () => {
    const expected = 'The name must start with client- and contain only lower case letters and dashes.';
    await expect(generator.default(tree, { ...context, name: '' })).rejects.toThrowError(expected);
  });

  it('should throw error if a name has incorrect format', async () => {
    const expected = 'The name must start with client- and contain only lower case letters and dashes.';
    await expect(generator.default(tree, { ...context, name: 'feature-client' })).rejects.toThrowError(expected);
  });

  it('should generate expected files and directories', async () => {
    await generator.default(tree, context);

    expectFileToExist(`/libs/${context.name}/.eslintrc.json`);
    expectFileToExist(`/libs/${context.name}/jest.config.ts`);
    expectFileToExist(`/libs/${context.name}/README.md`);
    expectFileToExist(`/libs/${context.name}/tsconfig.eslint.json`);
    expectFileToExist(`/libs/${context.name}/tsconfig.json`);
    expectFileToExist(`/libs/${context.name}/tsconfig.lib.json`);
    expectFileToExist(`/libs/${context.name}/tsconfig.spec.json`);

    expectFileToExist(`/libs/${context.name}/src/index.ts`);
    expectFileToExist(`/libs/${context.name}/src/test-setup.ts`);

    const kebabCaseName = context.name.replace('client-', '');

    const barrel = tree.read(`/libs/${context.name}/src/index.ts`, 'utf-8');
    expect(barrel).toContain(`export * from './lib/${kebabCaseName}.module';`);

    expectFileToExist(`/libs/${context.name}/src/lib/${kebabCaseName}-routing.module.ts`);
    expectFileToExist(`/libs/${context.name}/src/lib/${kebabCaseName}.module.ts`);

    expectFileToExist(`/libs/${context.name}/src/lib/services/${kebabCaseName}.service.spec.ts`);
    expectFileToExist(`/libs/${context.name}/src/lib/services/${kebabCaseName}.service.ts`);

    expectFileToExist(`/libs/${context.name}/src/lib/guards/${kebabCaseName}.guard.spec.ts`);
    expectFileToExist(`/libs/${context.name}/src/lib/guards/${kebabCaseName}.guard.ts`);

    expectFileToExist(`/libs/${context.name}/src/lib/components/${kebabCaseName}/${kebabCaseName}.component.html`);
    expectFileToExist(`/libs/${context.name}/src/lib/components/${kebabCaseName}/${kebabCaseName}.component.scss`);
    expectFileToExist(`/libs/${context.name}/src/lib/components/${kebabCaseName}/${kebabCaseName}.component.spec.ts`);
    expectFileToExist(`/libs/${context.name}/src/lib/components/${kebabCaseName}/${kebabCaseName}.component.ts`);
  });
});
