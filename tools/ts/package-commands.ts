import * as fs from 'fs';

/**
 * @name cwd
 * @constant
 * @summary Current working directory
 */
const cwd = __dirname;

interface IPackageJSON {
  scripts: Record<string, unknown>;
  husky: {
    hooks: Record<string, unknown>;
  };
  dependencies: Record<string, unknown>;
  devDependencies: Record<string, unknown>;
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
  console.log('<< WORKSPACE COMMANDS >>');
  // eslint-disable-next-line no-console
  console.log(Object.keys(parsedPackageJSON.scripts));
});
