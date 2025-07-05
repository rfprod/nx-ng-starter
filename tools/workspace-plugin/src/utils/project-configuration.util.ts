import { type ProjectConfiguration, readProjectConfiguration, type Tree, updateProjectConfiguration } from '@nx/devkit';

/**
 * Updates linter configuration in a respective project.json file.
 */
export const updateProjectLinterConfig = <T = Record<string, string>>(schema: T & { name: string }, tree: Tree) => {
  const projectConfig: ProjectConfiguration = readProjectConfiguration(tree, schema.name);
  if (typeof projectConfig.targets !== 'undefined') {
    if (typeof projectConfig.targets['lint'] === 'undefined') {
      Object.defineProperty(projectConfig.targets, 'lint', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: {},
      });
    }
    projectConfig.targets['lint'].executor = '@nx/eslint:lint';
    projectConfig.targets['lint'].options = {
      ...(projectConfig.targets['lint'].options ?? {}),
      eslintConfig: `{projectRoot}/eslint.config.mjs`,
      lintFilePatterns: [`{projectRoot}/**/*.ts`, `{projectRoot}/**/*.html`],
    };
  }

  updateProjectConfiguration(tree, schema.name, projectConfig);
};

/**
 * Updates test configuration in a respective project.json file.
 */
export const updateProjectTestConfig = <T = Record<string, string>>(schema: T & { name: string }, tree: Tree, userInterface?: boolean) => {
  const projectConfig: ProjectConfiguration = readProjectConfiguration(tree, schema.name);
  if (typeof projectConfig.targets !== 'undefined') {
    if (typeof projectConfig.targets['test'] === 'undefined') {
      Object.defineProperty(projectConfig.targets, 'test', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: {},
      });
    }
    projectConfig.targets['test'].executor = '@nx/vite:test';
    projectConfig.targets['test'].options = {
      compiler: 'swc',
      configFile: `{projectRoot}/vitest.config.mts`,
      coverageProvider: 'istanbul',
      uiFramework: userInterface === true ? 'angular' : 'none',
    };
    if (typeof projectConfig.targets['test'].outputs !== 'undefined') {
      delete projectConfig.targets['test'].outputs;
    }
  }

  updateProjectConfiguration(tree, schema.name, projectConfig);
};
