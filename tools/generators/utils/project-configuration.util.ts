import { ProjectConfiguration, readProjectConfiguration, Tree, updateProjectConfiguration } from '@nrwl/devkit';

/**
 * Replaces linter executor in the project.json file, uses @angular-eslint.
 */
export const updateProjectLinterConfig = <T = Record<string, string>>(schema: T & { name: string }, tree: Tree) => {
  const projectConfig: ProjectConfiguration = readProjectConfiguration(tree, schema.name);
  if (typeof projectConfig.targets !== 'undefined') {
    projectConfig.targets.lint.executor = '@angular-eslint/builder:lint';
    projectConfig.targets.lint.options = {
      ...(projectConfig.targets.lint.options ?? {}),
      eslintConfig: `libs/${schema.name}/.eslintrc.json`,
      lintFilePatterns: [`libs/${schema.name}/**/*.ts`],
    };
    projectConfig.targets.lint.outputs = ['{options.outputFile}'];
  }

  updateProjectConfiguration(tree, schema.name, projectConfig);
};
