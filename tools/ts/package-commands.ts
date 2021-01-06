import * as fs from 'fs';
import { argv } from 'yargs';

import { COLORS } from './colors';

/**
 * @name cwd
 * @constant
 * @summary Current working directory
 */
const cwd = __dirname;

interface IPackageJSON {
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
 * Prints arguments usage tip if no applicable arguments were used.
 */
function printSearchArgumentTip() {
  const search = argv.search;
  if (typeof search !== 'string') {
    console.log(
      `\n${COLORS.CYAN}%s${COLORS.DEFAULT} ${COLORS.YELLOW}%s${COLORS.DEFAULT}
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
function printPackageScripts(scripts: IPackageJSON['scripts']) {
  const search = argv.search;
  const scriptKeys =
    typeof search !== 'string'
      ? Object.keys(scripts)
      : Object.keys(scripts).filter(key => new RegExp(search).test(key));
  for (const key of scriptKeys) {
    console.log(
      `$ ${COLORS.CYAN}yarn${COLORS.DEFAULT} ${COLORS.CYAN}%s${COLORS.DEFAULT}: ${COLORS.YELLOW}%s${COLORS.DEFAULT}`,
      `${key}`,
      `${scripts[key]}`,
    );
  }
}

fs.readFile(`${cwd}/../../package.json`, 'utf8', (error, data) => {
  if (error !== null) {
    throw error;
  }

  const parsedPackageJSON: IPackageJSON = JSON.parse(data);
  console.log(`${COLORS.YELLOW}%s${COLORS.DEFAULT}`, '<< WORKSPACE COMMANDS >>');

  const scripts = parsedPackageJSON.scripts;
  printPackageScripts(scripts);

  printSearchArgumentTip();
});
