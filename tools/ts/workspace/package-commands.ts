import { getProjects, ProjectConfiguration, TargetConfiguration } from '@nrwl/devkit';
import * as fs from 'fs';
import { FsTree } from 'nx/src/generators/tree';
import { argv } from 'yargs';

import { COLORS } from '../utils/colors';
import { logger } from '../utils/logger';

/**
 * Project root directory.
 */
const root = process.cwd();

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

type TCli = 'yarn' | 'nx';

/**
 * Prints arguments usage tip if no applicable arguments were used.
 */
const printSearchArgumentTip = () => {
  const search = (<{ [key: string]: string }>argv).search;
  if (typeof search !== 'string') {
    // eslint-disable-next-line no-console -- needed here to print output in the terminal
    console.log(
      `\n${COLORS.CYAN}%s${COLORS.DEFAULT} ${COLORS.YELLOW}%s${COLORS.DEFAULT}\n
${COLORS.CYAN}%s${COLORS.DEFAULT} ${COLORS.YELLOW}%s${COLORS.DEFAULT}\n`,
      'Use --search flag to filter available commands, e.g.',
      'yarn workspace:help --search=build',
      'Some common --search flag values:',
      'start generate install build lint test e2e affected analyze firebase nx workspace',
    );
  }
};

/**
 * Prints package scripts.
 * @param scripts package scripts object.
 */
const printPackageScripts = (scripts: Record<string, string>, cli: TCli) => {
  const search = (<{ [key: string]: string }>argv).search;
  const scriptKeys = typeof search !== 'string' ? Object.keys(scripts) : Object.keys(scripts).filter(key => new RegExp(search).test(key));
  for (const key of scriptKeys) {
    // eslint-disable-next-line no-console -- needed here to print output in the terminal
    console.log(
      `$ ${COLORS.CYAN}${cli}${COLORS.DEFAULT} ${COLORS.CYAN}%s${COLORS.DEFAULT}: ${COLORS.YELLOW}%s${COLORS.DEFAULT}`,
      `${key}`,
      `${scripts[key]}`,
    );
  }
};

/**
 * Parses package.json and prints root level commands.
 */
const printPackageCommands = () => {
  fs.readFile(`${root}/package.json`, 'utf8', (error, data) => {
    if (error !== null) {
      logger.printError(error);
      process.exit(1);
    }

    const parsedPackageJson: IPackageJson = JSON.parse(data);
    logger.printInfo('', 'Root commands');

    const scripts = parsedPackageJson.scripts;
    printPackageScripts(scripts, 'yarn');
  });
};

/**
 * Parses workspace.json and prints project level commands.
 */
const printNxCommands = () => {
  const tree = new FsTree(root, true);
  const projects = [...getProjects(tree).values()];

  let allCommands: Record<string, string> = {};

  for (let i = 0, max = projects.length; i < max; i += 1) {
    const config = projects[i];
    const projectName = config.name;
    const projectDir = config.root;
    const projectJsonPath = `${projectDir}/project.json`;

    const result: NodeJS.ErrnoException | string = fs.readFileSync(projectJsonPath, 'utf8');
    if (typeof result !== 'string') {
      logger.printError(result);
      process.exit(1);
    }

    const projectConfig: ProjectConfiguration = JSON.parse(result);
    const targets = projectConfig.targets;

    const targetKeys = typeof targets !== 'undefined' ? Object.keys(targets) : [];

    // aggregate custom commands based on nx:run-commands
    if (typeof targets !== 'undefined') {
      const commands = targetKeys
        .filter(key => targets[key].executor === 'nx:run-commands')
        .reduce((acc: Record<string, string>, key) => {
          const target: TargetConfiguration<{
            commands?: { command: string }[];
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

  logger.printInfo('', 'Project commands');

  printPackageScripts(allCommands, 'nx');

  printSearchArgumentTip();
};

printPackageCommands();

printNxCommands();
