import { ExecutorContext, getProjects, logger, ProjectConfiguration, updateProjectConfiguration } from '@nrwl/devkit';
import { flushChanges, FsTree } from 'nx/src/generators/tree';

import { IExecutorOptions } from './schema';

export interface IProjectMetadata {
  name: string;
  config: ProjectConfiguration;
}

export class AppConfigurePrettierCheckExecutor {
  public options: IExecutorOptions = {
    config: '',
  };

  public context: ExecutorContext = {
    cwd: process.cwd(),
    isVerbose: false,
    root: '/root',
    workspace: {
      version: 2,
      projects: {},
    },
  };

  public tree: FsTree = new FsTree(this.context.root, false);

  constructor(options: IExecutorOptions, context: ExecutorContext) {
    this.options = { ...options };
    this.context = { ...context };
    this.tree = new FsTree(this.context.root, false);
  }

  private addExecutorConfiguration(tree: FsTree, project: IProjectMetadata) {
    const srcRoot = project.config.sourceRoot;
    if (typeof srcRoot === 'undefined') {
      throw new Error(`The project ${project.name} does not have the 'sourceRoot' configuration option defined.`);
    }

    const suffix = project.name.includes('-e2e')
      ? 'e2e'
      : project.config.projectType === 'library'
      ? 'lib'
      : project.config.projectType === 'application'
      ? 'app'
      : '';

    if (suffix === '') {
      throw new Error(`Could not determine a suffix for the project: ${project.name}.`);
    }

    const config = { ...project.config };
    if (typeof config.targets === 'undefined') {
      throw new Error(`The project ${project.name} does not have the 'targets' configuration option defined.`);
    }
    if (typeof config.targets['prettier-check'] === 'undefined' && /\/src$/.test(srcRoot)) {
      config.targets['prettier-check'] = {
        executor: './tools/executors/prettier:check',
        options: {
          config: this.options.config,
        },
        outputs: [`{workspaceRoot}/dist/out-tsc/${srcRoot.replace(/\/src$/, '')}`],
      };
      updateProjectConfiguration(tree, project.name, config);
    }
  }

  private removeExecutorConfiguration(tree: FsTree, project: IProjectMetadata) {
    const config = { ...project.config };
    if (typeof config.targets === 'undefined') {
      throw new Error(`The project ${project.name} does not have the 'targets' configuration option defined.`);
    }
    if (typeof config.targets['prettier-check'] !== 'undefined') {
      delete config.targets['prettier-check'];
      updateProjectConfiguration(tree, project.name, config);
    }
  }

  public configure() {
    const projects = getProjects(this.tree);

    const entries = [...projects.entries()];
    for (let i = 0, max = entries.length; i < max; i += 1) {
      const project = {
        name: entries[i][0],
        config: entries[i][1],
      };

      if (this.options.cleanup === true) {
        this.removeExecutorConfiguration(this.tree, project);
      } else {
        this.addExecutorConfiguration(this.tree, project);
      }
    }

    if (this.options.dryRun !== true) {
      const changes = this.tree.listChanges();

      flushChanges(this.context.root, changes);

      if (this.options.cleanup === true) {
        logger.warn(
          `Don't forget to remove the executor configuration target from './tools/project.json'. Find a target 'prettier-configure'.`,
        );
      }
    }
  }
}

export default async function configureTscCheck(options: IExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
  const executor = new AppConfigurePrettierCheckExecutor(options, context);
  executor.configure();

  return { success: true };
}
