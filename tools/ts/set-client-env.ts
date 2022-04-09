import { constants } from 'fs';
import { access, readFile, writeFile } from 'fs/promises';
import { argv } from 'yargs';

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
  // eslint-disable-next-line no-console -- print usage instructions in the terminal
  console.log(`Usage examples:

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
  `);
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
    throw new Error(`The application name is not defined.\nSupported apps: ${supportedApps.join(' ')}`);
  }

  if (!supportedApps.includes(app)) {
    printUsage();
    throw new Error(`The application is not supported.\nSupported apps: ${supportedApps.join(' ')}`);
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
      // eslint-disable-next-line no-console -- print error in the terminal
      console.log('Unable to read the package.json', error);
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
    // eslint-disable-next-line no-console -- print error in the terminal
    console.log('Unable to access the environment configuration file', error);
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
      // eslint-disable-next-line no-console -- print output in the terminal
      console.log(`Output generated at ${envPath}`);
    })
    .catch(error => {
      // eslint-disable-next-line no-console -- print error in the terminal
      console.log('Unable to write the environment configuration file', envConfig);
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
    // eslint-disable-next-line no-console -- print output in the terminal
    console.log('The environment is configured.');
  })
  .catch(error => {
    // eslint-disable-next-line no-console -- print error in the terminal
    console.error('There was an error executing the program', error);
    process.exit(1);
  });
