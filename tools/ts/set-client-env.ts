import { constants } from 'fs';
import { access, readFile, writeFile } from 'fs/promises';
import { argv } from 'yargs';

import { logger } from './utils/logger';

/**
 * @name cwd
 * @constant
 * @summary current working directory
 */
const cwd = __dirname;

/**
 * The supported application names.
 */
const supportedApps = ['client', 'elements'];

/**
 * Prints the script usage instructions.
 */
const printUsage = () => {
  const message = `
  # read values from the workspace configuration files without passing arguments
    $ npx ts-node -O '{ \\"module\\": \\"commonjs\\", \\"typeRoots\\": [\\"node_modules/@types\\"], \\"types\\": [\\"node\\"] }' tools/ts/set-env.ts --app client
    $ npx ts-node -O '{ \\"module\\": \\"commonjs\\", \\"typeRoots\\": [\\"node_modules/@types\\"], \\"types\\": [\\"node\\"] }' tools/ts/set-env.ts --app client --reset
  # same via the package commands
    $ yarn tools:env:client:set --app client
    $ yarn tools:env:client:reset

  # read values from the arguments without using the workspace configuration files
    $ npx ts-node -O '{ \\"module\\": \\"commonjs\\", \\"typeRoots\\": [\\"node_modules/@types\\"], \\"types\\": [\\"node\\"] }' tools/ts/set-env.ts --app client --VERSION=value
    $ npx ts-node -O '{ \\"module\\": \\"commonjs\\", \\"typeRoots\\": [\\"node_modules/@types\\"], \\"types\\": [\\"node\\"] }' tools/ts/set-env.ts --app client --reset
  # same via the package commands
    $ yarn tools:env:client:set --app client --VERSION=value
    $ yarn tools:env:client:reset

  # supported apps: ${supportedApps.join(' ')}
  `;
  logger.printInfo(message, 'Usage examples');
};

/**
 * The application name argument.
 */
const app = (<{ [key: string]: string | undefined }>argv).app;

/**
 * Indicates that the value of the environment configuration file should be reset.
 */
const reset = (<{ [key: string]: boolean | undefined }>argv).reset;

if (typeof reset === 'undefined') {
  if (typeof app === 'undefined') {
    printUsage();

    const error = new Error(`The application name is not defined.\nSupported apps: ${supportedApps.join(' ')}`);
    logger.printError(error);
    process.exit(1);
  }

  if (!supportedApps.includes(app)) {
    printUsage();

    const error = new Error(`The application is not supported.\nSupported apps: ${supportedApps.join(' ')}`);
    logger.printError(error);
    process.exit(1);
  }
}

/**
 * The environment configuration file path.
 */
const envConfigFilePath = `${cwd}/../../apps/${app}/src/environments/environment.config.ts`;

/**
 * The environment configuration file initial value.
 */
const envConfigFileInitialValue = `/**
 * Metadata environment configuration factory.
 * @returns metadata environment configuration
 */
export const metaEnvFactory = () => ({
  version: 'N/A',
});
`;

/**
 * Generated the environment configuration file content.
 * @param options the environment configuration options
 * @returnsthe encironment configuration file content
 */
const generateEnvConfigFileContent = (options: { version: string }) => {
  const envConfig = `/**
 * Metadata environment configuration factory.
 * @returns metadata environment configuration
 */
export const metaEnvFactory = () => ({
  version: '${options.version}',
});
`;
  return envConfig;
};

/**
 * Gets the value of the version property from the package.json file.
 * @param source the package.json file location
 * @returns the value of the version property from the package.json file
 */
const getPackageVersion = (source = `${cwd}/../../package.json`) =>
  readFile(source, 'utf8')
    .then<string>(data => {
      const packageJsonContent: {
        version: string;
        [key: string]: unknown;
      } = JSON.parse(data);
      return packageJsonContent.version;
    })
    .catch(error => {
      logger.printError(error, 'Unable to read the package.json');
      process.exit(1);
    });

const getEnvConfiguration = async () => {
  const version = await getPackageVersion();

  if (typeof reset === 'undefined') {
    return generateEnvConfigFileContent({ version });
  }
  return envConfigFileInitialValue;
};

/**
 * Checks the environment configuration file access.
 * @param envPath the environment configutaion file path
 * @returns the execution result
 */
const checkEnvConfigFileAccess = (envPath: string) =>
  access(envPath, constants.W_OK).catch(error => {
    logger.printError(error, 'Unable to write the environment configuration file');
    process.exit(1);
  });

/**
 * Writes the environment configuration file content.
 * @param envPath the environment configuration file path
 * @param envConfig the environment configuration file content
 * @returns
 */
const writeEnvConfigFile = (envPath: string, envConfig: string) =>
  writeFile(envPath, envConfig)
    .then(() => {
      logger.printSuccess(`Output generated at ${envPath}`);
    })
    .catch(error => {
      logger.printError(error, 'Unable to write the environment configuration file');
      process.exit(1);
    });

/**
 * Executes the program.
 */
const execute = async () => {
  const config = await getEnvConfiguration();
  await checkEnvConfigFileAccess(envConfigFilePath);
  await writeEnvConfigFile(envConfigFilePath, config);
};

execute()
  .then(() => {
    logger.printSuccess('The environment is configured.');
  })
  .catch(error => {
    logger.printError(error, 'There was an error executing the program');
    process.exit(1);
  });
