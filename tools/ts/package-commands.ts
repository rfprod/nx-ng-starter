import * as fs from 'fs';

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

fs.readFile(`${cwd}/../../package.json`, 'utf8', (error, data) => {
  if (error) {
    throw error;
  }
  const parsedPackageJSON: IPackageJSON = JSON.parse(data);
  // eslint-disable-next-line no-console
  console.log(`${COLORS.YELLOW}%s${COLORS.DEFAULT}`, '<< WORKSPACE COMMANDS >>');
  const scripts = parsedPackageJSON.scripts;
  const scriptKeys = Object.keys(scripts);
  for (const key of scriptKeys) {
    // eslint-disable-next-line no-console
    console.log(
      `$ ${COLORS.CYAN}yarn${COLORS.DEFAULT} ${COLORS.CYAN}%s${COLORS.DEFAULT}: ${COLORS.YELLOW}%s${COLORS.DEFAULT}`,
      `${key}`,
      `${scripts[key]}`,
    );
  }
});
