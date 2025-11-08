import {
  type ExecutorContext,
  getProjects,
  logger,
  type ProjectConfiguration,
  readProjectConfiguration,
  type TargetConfiguration,
} from '@nx/devkit';
import { FsTree } from 'nx/src/generators/tree';

import type { IExecutorOptions } from './schema';

interface IPackageJson {
  scripts: Record<string, string>;
  husky: {
    hooks: Record<string, string>;
  };
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  engines: {
    node: string;
    npm: string;
  };
}

/**
 * Supported command line interfaces.
 */
enum CLI {
  YARN = 'yarn',
  NX = 'nx',
}

/**
 * Prints arguments usage tip if no applicable arguments were used.
 */
const printSearchArgumentTip = (search?: string) => {
  if (typeof search !== 'string') {
    logger.info('\n> Use --search flag to filter available commands, e.g.');
    logger.info('  yarn workspace:help --search=build');
    logger.info('> Some common --search flag values:');
    logger.info('  start generate install build lint test e2e affected analyze firebase nx workspace');
  }
};

/**
 * Prints package scripts.
 * @param scripts Package scripts object.
 * @param cli Supported command line interface.
 * @param search If provided, its value is used for filtering found commands.
 */
const printPackageScripts = (scripts: Record<string, string>, cli: CLI, search?: string) => {
  const scriptKeys = typeof search !== 'string' ? Object.keys(scripts) : Object.keys(scripts).filter(key => new RegExp(search).test(key));
  for (const key of scriptKeys) {
    logger.log(`$ ${cli} ${key}: ${scripts[key]}`);
  }
};

/**
 * Parses package.json and prints root level commands.
 * @param tree The file system tree.
 * @param search If provided, its value is used for filtering found commands.
 */
const printPackageCommands = (tree: FsTree, search?: string) => {
  let data: string | null = null;

  try {
    data = tree.read('package.json', 'utf8');
  } catch (error) {
    logger.error(error as NodeJS.ErrnoException);
    process.exit(1);
  }

  if (data === null) {
    throw new Error('Something went wrong, `package.json` content value is `null`');
  }

  const parsedPackageJson: IPackageJson = JSON.parse(data);
  logger.info('\n# Root commands');

  const scripts = parsedPackageJson.scripts;
  printPackageScripts(scripts, CLI.YARN, search);
};

/**
 * Parses workspace.json and prints project level commands.
 * @param tree The file system tree.
 * @param search If provided, its value is used for filtering found commands.
 */
const printNxCommands = (tree: FsTree, search?: string) => {
  const projects = [...getProjects(tree).values()];

  let allCommands: Record<string, string> = {};

  for (let i = 0, max = projects.length; i < max; i += 1) {
    const config = projects[i];
    const projectName = config.name;

    if (typeof projectName === 'undefined') {
      throw new Error('Something went wrong, project name value is `undefined`');
    }

    const projectConfig: ProjectConfiguration = readProjectConfiguration(tree, projectName);
    const targets = projectConfig.targets;

    const targetKeys = typeof targets !== 'undefined' ? Object.keys(targets) : [];

    // aggregate custom commands based on nx:run-commands
    if (typeof targets !== 'undefined') {
      const commands = targetKeys
        .filter(key => targets[key].executor === 'nx:run-commands')
        .reduce((acc: Record<string, string>, key) => {
          const target: TargetConfiguration<{
            commands?: Array<{ command: string }>;
          }> = targets[key];
          const commandsConfig = target.options?.commands;
          acc[`run ${projectName}:${key}`] = typeof commandsConfig !== 'undefined' ? commandsConfig[0].command : '';
          return acc;
        }, {});
      allCommands = { ...allCommands, ...commands };
    }

    // aggregate commands based on executors
    if (typeof targets !== 'undefined') {
      const commands = targetKeys
        .filter(key => targets[key].executor !== 'nx:run-commands')
        .reduce((acc: Record<string, string>, key) => {
          acc[`run ${projectName}:${key}`] = `npx nx ${key} ${projectConfig.name}`;
          return acc;
        }, {});
      allCommands = { ...allCommands, ...commands };
    }
  }

  logger.info('\n# Project commands');

  printPackageScripts(allCommands, CLI.NX, search);

  printSearchArgumentTip(search);
};

export default async function workspaceCommands(options: IExecutorOptions, context: ExecutorContext): Promise<{ success: boolean }> {
  const search = options.search;

  const tree = new FsTree(context.root, false);

  printPackageCommands(tree, search);

  printNxCommands(tree, search);

  return { success: true };
}
