import * as fs from 'fs';
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

interface IProjectConfigV1 {
  [key: string]: unknown;
  architect: Record<
    string,
    {
      builder?: string;
      executor?: string;
      options?: {
        commands?: {
          command: string;
        }[];
      };
    }
  >;
}

enum WORKSPACE_VERSION {
  FIRST = 1,
  SECOND = 2,
}

interface IAngularJson<T = unknown> {
  projects: Record<string, T>;
  version: number;
}

type TAngularJsonV1 = IAngularJson<IProjectConfigV1>;

type TAngularJsonV2 = IAngularJson<string>;

interface IProjectConfigV2 {
  [key: string]: unknown;
  targets: Record<
    string,
    {
      builder?: string;
      executor?: string;
      options?: {
        commands?: {
          command: string;
        }[];
      };
    }
  >;
}

/**
 * Prints arguments usage tip if no applicable arguments were used.
 */
function printSearchArgumentTip() {
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
}

/**
 * Prints package scripts.
 * @param scripts package scripts object.
 */
function printPackageScripts(scripts: Record<string, string>, cli: 'yarn' | 'nx') {
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
}

fs.readFile(`${root}/package.json`, 'utf8', (error, data) => {
  if (error !== null) {
    logger.printError(error);
    process.exit(1);
  }

  const parsedPackageJson: IPackageJson = JSON.parse(data);
  logger.printInfo('', 'PACKAGE COMMANDS');

  const scripts = parsedPackageJson.scripts;
  printPackageScripts(scripts, 'yarn');
});

const processWorkpaceV1 = (angularJson: TAngularJsonV1) => {
  const projectNames = Object.keys(angularJson.projects);
  const projectConfigs = projectNames.map(name => angularJson.projects[name]);

  let allCommands: Record<string, string> = {};

  for (let i = 0, max = projectConfigs.length; i < max; i += 1) {
    const projectName = projectNames[i];
    const projectConfig = projectConfigs[i];

    const commands = Object.keys(projectConfig.architect ?? {})
      .filter(
        key =>
          projectConfig.architect[key].builder === '@nrwl/workspace:run-commands' ||
          projectConfig.architect[key].executor === '@nrwl/workspace:run-commands',
      )
      .reduce((acc, key) => {
        const commandsConfig = projectConfig.architect[key].options?.commands;
        acc[`run ${projectName}:${key}`] = typeof commandsConfig !== 'undefined' ? commandsConfig[0].command : '';
        return acc;
      }, {});
    allCommands = { ...allCommands, ...commands };
  }

  logger.printInfo('', 'EXTRA nx COMMANDS');

  printPackageScripts(allCommands, 'nx');

  printSearchArgumentTip();
};

const processWorkpaceV2 = (angularJson: TAngularJsonV2) => {
  const projectNames = Object.keys(angularJson.projects);
  const projectDirs = projectNames.map(name => angularJson.projects[name]);

  let allCommands: Record<string, string> = {};

  for (let i = 0, max = projectNames.length; i < max; i += 1) {
    const projectName = projectNames[i];
    const projectDir = projectDirs[i];
    const projectJsonPath = `${projectDir}/project.json`;

    const result: NodeJS.ErrnoException | string = fs.readFileSync(projectJsonPath, 'utf8');
    if (typeof result !== 'string') {
      logger.printError(result);
      process.exit(1);
    }

    const projectConfig: IProjectConfigV2 = JSON.parse(result);

    const commands = Object.keys(projectConfig.targets ?? {})
      .filter(
        key =>
          projectConfig.targets[key].builder === '@nrwl/workspace:run-commands' ||
          projectConfig.targets[key].executor === '@nrwl/workspace:run-commands',
      )
      .reduce((acc, key) => {
        const commandsConfig = projectConfig.targets[key].options?.commands;
        acc[`run ${projectName}:${key}`] = typeof commandsConfig !== 'undefined' ? commandsConfig[0].command : '';
        return acc;
      }, {});
    allCommands = { ...allCommands, ...commands };
  }

  logger.printInfo('', 'EXTRA nx COMMANDS');

  printPackageScripts(allCommands, 'nx');

  printSearchArgumentTip();
};

fs.readFile(`${root}/angular.json`, 'utf8', (error, data) => {
  if (error !== null) {
    logger.printError(error);
    process.exit(1);
  }

  const angularJson: IAngularJson = JSON.parse(data);
  if (angularJson.version === WORKSPACE_VERSION.FIRST) {
    processWorkpaceV1(<TAngularJsonV1>angularJson);
  } else if (angularJson.version === WORKSPACE_VERSION.SECOND) {
    processWorkpaceV2(<TAngularJsonV2>angularJson);
  }
});
