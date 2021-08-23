import * as fs from 'fs';
import { argv } from 'yargs';

import { COLORS } from './colors';

/**
 * @name cwd
 * @constant
 * @summary Current working directory
 */
const cwd = __dirname;

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

interface IToolsProjectCommands {
  projects: {
    tools?: {
      architect: Record<
        string,
        {
          builder: string;
          options?: {
            commands: {
              command: string;
            }[];
          };
        }
      >;
    };
  };
}

/**
 * Prints arguments usage tip if no applicable arguments were used.
 */
function printSearchArgumentTip() {
  const search = argv.search;
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
function printPackageScripts(scripts: IPackageJson['scripts'], cli: 'yarn' | 'ng') {
  const search = argv.search;
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

fs.readFile(`${cwd}/../../package.json`, 'utf8', (error, data) => {
  if (error !== null) {
    throw error;
  }

  const parsedPackageJson: IPackageJson = JSON.parse(data);
  // eslint-disable-next-line no-console -- needed here to print output in the terminal
  console.log(`\n${COLORS.YELLOW}%s${COLORS.DEFAULT}`, '<< PACKAGE COMMANDS >>');

  const scripts = parsedPackageJson.scripts;
  printPackageScripts(scripts, 'yarn');
});

fs.readFile(`${cwd}/../../angular.json`, 'utf8', (error, data) => {
  if (error !== null) {
    throw error;
  }

  const angularJson: IToolsProjectCommands = JSON.parse(data);
  // eslint-disable-next-line no-console -- needed here to print output in the terminal
  console.log(`\n${COLORS.YELLOW}%s${COLORS.DEFAULT}`, '<< EXTRA ng COMMANDS >>');

  const commands = Object.keys(angularJson.projects.tools?.architect ?? {})
    .filter(key => angularJson.projects.tools?.architect[key].builder === '@nrwl/workspace:run-commands')
    .reduce((acc, key) => {
      acc[`run tools:${key}`] = angularJson.projects.tools?.architect[key].options?.commands[0].command ?? '';
      return acc;
    }, {});
  printPackageScripts(commands, 'ng');

  printSearchArgumentTip();
});
