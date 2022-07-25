import { ExecutorContext, getProjects, logger, ProjectConfiguration, updateProjectConfiguration } from '@nrwl/devkit';
import { flushChanges, FsTree } from 'nx/src/generators/tree';

import { IExecutorOptions } from './schema';

interface IProjectMetadata {
  name: string;
  config: ProjectConfiguration;
}

const addExecutorConfiguration = (tree: FsTree, project: IProjectMetadata) => {
  const srcRoot = project.config.sourceRoot;
  if (typeof srcRoot === 'undefined') {
    logger.error(new Error(`The project ${project.name} does not have the 'sourceRoot' configuration option defined.`));
    process.exit(1);
  }

  const suffix = project.name.includes('-e2e')
    ? 'e2e'
    : project.config.projectType === 'library'
    ? 'lib'
    : project.config.projectType === 'application'
    ? 'app'
    : '';

  if (suffix === '') {
    logger.error(new Error(`Could not determine a suffix for the project: ${project.name}.`));
    process.exit(1);
  }

  const config = { ...project.config };
  if (typeof config.targets === 'undefined') {
    logger.error(new Error(`The project ${project.name} does not have the 'targets' configuration option defined.`));
    process.exit(1);
  }
  if (typeof config.targets['tsc-check'] === 'undefined' && /\/src$/.test(srcRoot)) {
    config.targets['tsc-check'] = {
      executor: './tools/executors/tsc:check',
      options: {
        tsConfig: `${srcRoot.replace(/src$/, `tsconfig.${suffix}.json`)}`,
      },
      outputs: [`dist/out-tsc/${srcRoot.replace(/\/src$/, '')}`],
    };
    updateProjectConfiguration(tree, project.name, config);
  }
};

const removeExecutorConfiguration = (tree: FsTree, project: IProjectMetadata) => {
  const config = { ...project.config };
  if (typeof config.targets === 'undefined') {
    logger.error(new Error(`The project ${project.name} does not have the 'targets' configuration option defined.`));
    process.exit(1);
  }
  if (typeof config.targets['tsc-check'] !== 'undefined') {
    delete config.targets['tsc-check'];
  }
  updateProjectConfiguration(tree, project.name, config);
};

export default async function configureTscCheck(options: IExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
  const tree = new FsTree(context.root, false);
  const projects = getProjects(tree);

  const entries = [...projects.entries()];
  for (let i = 0, max = entries.length; i < max; i += 1) {
    const project = {
      name: entries[i][0],
      config: entries[i][1],
    };

    if (options.cleanup === true) {
      removeExecutorConfiguration(tree, project);
    } else {
      addExecutorConfiguration(tree, project);
    }
  }

  const changes = tree.listChanges();

  flushChanges(context.root, changes);

  if (options.cleanup === true) {
    logger.info(`Don't forget to remove the executor configuration target from './tools/project.json'. Find a target 'tsc-configure'.`);
  }

  return { success: true };
}
