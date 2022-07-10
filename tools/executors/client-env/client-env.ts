import { ExecutorContext, logger } from '@nrwl/devkit';
import { constants } from 'fs';
import { access, readFile, stat, writeFile } from 'fs/promises';

import { IExecutorOptions, TSupportedApp } from './schema';

interface IEnvConfig {
  version: string;
}

export class AppClientEnvConfig {
  /**
   * Executor context.
   */
  public options: IExecutorOptions;

  /**
   * Executor context.
   */
  public context: ExecutorContext;

  /**
   * The supported application names.
   */
  private readonly supportedApps: TSupportedApp[] = ['client', 'documentation', 'elements'];

  /**
   * The environment configuration file initial value.
   */
  private readonly defaultEnv: IEnvConfig = {
    version: 'N/A',
  };

  constructor(options: IExecutorOptions, context: ExecutorContext) {
    this.options = { ...options };
    this.context = { ...context };
  }

  /**
   * Environment file path.
   */
  private environmentFilePath(app: TSupportedApp) {
    return `${this.context.cwd}/apps/${app}/src/environments/environment.config.ts`;
  }

  public async execute() {
    const reset = this.options.reset;
    const app = this.options.app;

    if (typeof reset === 'undefined') {
      if (typeof app === 'undefined') {
        const error = new Error(`The application name is not defined.\nSupported apps: ${this.supportedApps.join(' ')}`);
        logger.error(error);
        process.exit(1);
      }

      if (!this.supportedApps.includes(app)) {
        const error = new Error(`The application is not supported.\nSupported apps: ${this.supportedApps.join(' ')}`);
        logger.error(error);
        process.exit(1);
      }
    }

    const env = typeof reset !== 'undefined' ? this.defaultEnv : await this.getEnvValues();

    const envFilePath = this.environmentFilePath(app);

    await access(envFilePath, constants.W_OK).catch((error: NodeJS.ErrnoException) => {
      logger.error(`Unable to write the environment configuration file:\n${error.message}`);
      process.exit(1);
    });

    await this.writeEnvironmentFile(envFilePath, env);
  }

  /**
   * Returns environment configuration file contents.
   */
  private envConfigFileContents(options: IEnvConfig) {
    const envConfig = `/**
 * Metadata environment configuration factory.
 * @returns metadata environment configuration
 */
export const metaEnvFactory = () => ({
  version: '${options.version}',
});
`;
    return envConfig;
  }

  /**
   * Writes environment file.
   */
  private async writeEnvironmentFile(envFilePath: string, env: IEnvConfig) {
    return stat(envFilePath)
      .then(() => {
        const envFileContents = this.envConfigFileContents(env);
        return writeFile(envFilePath, envFileContents);
      })
      .catch((error: NodeJS.ErrnoException) => {
        logger.error(error.message);
        process.exit(1);
      })
      .finally(() => {
        logger.info(`Output generated at ${envFilePath}`);
      });
  }

  /**
   * Gets the value of the version property from the package.json file.
   * @param source the package.json file location
   * @returns the value of the version property from the package.json file
   */
  private async getPackageVersion(source = `${this.context.cwd}/package.json`) {
    return readFile(source, 'utf8')
      .then<string>(data => {
        const packageJsonContent: {
          version: string;
          [key: string]: unknown;
        } = JSON.parse(data);
        return packageJsonContent.version;
      })
      .catch((error: NodeJS.ErrnoException) => {
        logger.error(error.message);
        process.exit(1);
      });
  }

  /**
   * Sets environment variable values.
   */
  private async getEnvValues(): Promise<IEnvConfig> {
    const version = await this.getPackageVersion();

    const env: IEnvConfig = {
      version,
    };
    return env;
  }
}
