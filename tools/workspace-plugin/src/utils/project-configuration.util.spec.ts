import devkit from '@nx/devkit';
import { FsTree } from 'nx/src/generators/tree';
import { type MockInstance, vi } from 'vitest';

import { updateProjectLinterConfig, updateProjectTestConfig } from './project-configuration.util';

describe('updateProjectLinterConfig', () => {
  let spy: {
    readProjectConfiguration: MockInstance;
    updateProjectConfiguration: MockInstance;
  };

  beforeEach(async () => {
    spy = {
      readProjectConfiguration: vi.spyOn(devkit, 'readProjectConfiguration'),
      updateProjectConfiguration: vi.spyOn(devkit, 'updateProjectConfiguration'),
    };

    spy.updateProjectConfiguration.mockImplementation(() => void 0);
  });

  it('should call `updateProjectConfiguration` with params if project config does not have targets', () => {
    const schema = { name: 'xx' };
    const tree = new FsTree(process.cwd(), false);

    const projectConfig: devkit.ProjectConfiguration = { root: '', ...schema };
    spy.readProjectConfiguration.mockReturnValue(projectConfig);

    updateProjectLinterConfig(schema, tree);

    expect(spy.updateProjectConfiguration).toHaveBeenCalledWith(tree, schema.name, projectConfig);
  });

  it('should call `updateProjectConfiguration` with params if project config has targets', () => {
    const schema = { name: 'xx' };
    const tree = new FsTree(process.cwd(), false);

    const projectConfig: devkit.ProjectConfiguration = { root: '', ...schema, targets: { lint: {} } };
    spy.readProjectConfiguration.mockReturnValue(projectConfig);

    updateProjectLinterConfig(schema, tree);

    const updatedProjectConfig: devkit.ProjectConfiguration = {
      ...projectConfig,
      targets: {
        lint: {
          executor: '@nx/eslint:lint',
          options: {
            eslintConfig: '{projectRoot}/eslint.config.mjs',
            lintFilePatterns: ['{projectRoot}/**/*.ts', '{projectRoot}/**/*.html'],
          },
        },
      },
    };

    expect(spy.updateProjectConfiguration).toHaveBeenCalledWith(tree, schema.name, updatedProjectConfig);
  });
});

describe('updateProjectTestConfig', () => {
  let spy: {
    readProjectConfiguration: MockInstance;
    updateProjectConfiguration: MockInstance;
  };

  beforeEach(async () => {
    spy = {
      readProjectConfiguration: vi.spyOn(devkit, 'readProjectConfiguration'),
      updateProjectConfiguration: vi.spyOn(devkit, 'updateProjectConfiguration'),
    };

    spy.updateProjectConfiguration.mockImplementation(() => void 0);
  });

  it('should call `updateProjectConfiguration` with params if project config does not have targets', () => {
    const schema = { name: 'xx' };
    const tree = new FsTree(process.cwd(), false);

    const projectConfig: devkit.ProjectConfiguration = { root: '', ...schema };
    spy.readProjectConfiguration.mockReturnValue(projectConfig);

    updateProjectTestConfig(schema, tree);

    expect(spy.updateProjectConfiguration).toHaveBeenCalledWith(tree, schema.name, projectConfig);
  });

  it('should call `updateProjectConfiguration` with params if project config has targets', () => {
    const schema = { name: 'xx' };
    const tree = new FsTree(process.cwd(), false);

    const projectConfig: devkit.ProjectConfiguration = { root: '', ...schema, targets: { test: {} } };
    spy.readProjectConfiguration.mockReturnValue(projectConfig);

    updateProjectTestConfig(schema, tree);

    const updatedProjectConfig: devkit.ProjectConfiguration = {
      ...projectConfig,
      targets: {
        test: {
          executor: '@nx/vitest:test',
          options: {
            compiler: 'swc',
            configFile: '{projectRoot}/vitest.config.mts',
            coverageProvider: 'istanbul',
            uiFramework: 'none',
          },
        },
      },
    };

    expect(spy.updateProjectConfiguration).toHaveBeenCalledWith(tree, schema.name, updatedProjectConfig);
  });

  it('should call `updateProjectConfiguration` with params if project config has targets (for UI framework)', () => {
    const schema = { name: 'xx' };
    const tree = new FsTree(process.cwd(), false);

    const projectConfig: devkit.ProjectConfiguration = { root: '', ...schema, targets: { test: {} } };
    spy.readProjectConfiguration.mockReturnValue(projectConfig);

    updateProjectTestConfig(schema, tree, true);

    const updatedProjectConfig: devkit.ProjectConfiguration = {
      ...projectConfig,
      targets: {
        test: {
          executor: '@nx/vitest:test',
          options: {
            compiler: 'swc',
            configFile: '{projectRoot}/vitest.config.mts',
            coverageProvider: 'istanbul',
            uiFramework: 'angular',
            tsConfig: `libs/${schema.name}/tsconfig.lib.json`,
          },
        },
      },
    };

    expect(spy.updateProjectConfiguration).toHaveBeenCalledWith(tree, schema.name, updatedProjectConfig);
  });
});
