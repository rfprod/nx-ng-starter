import { ExecutorContext, logger } from '@nrwl/devkit';
import dotenv from 'dotenv';
import { constants } from 'fs';
import { access, readFile, stat, writeFile } from 'fs/promises';

import { IExecutorOptions, TSupportedApp } from './schema';

interface IEnvConfig {
  version: string;
}

export abstract class AppBaseEnvConfig<T = IEnvConfig> {
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
  protected supportedApps: TSupportedApp[] = [];

  /**
   * The environment configuration file initial value.
   */
  protected defaultEnv: T = <T>(<unknown>{
    version: 'N/A',
  });

  constructor(options: IExecutorOptions, context: ExecutorContext) {
    this.options = { ...options };
    this.context = { ...context };
    /**
     * Load environment variables.
     */
    dotenv.config({ path: `${this.context.cwd}/.env` });
  }

  /**
   * Environment file path.
   */
  private environmentFilePath(app: TSupportedApp) {
    return `${this.context.cwd}/apps/${app}/src/environments/environment.config.ts`;
  }

  /**
   * Configures the application environment.
   */
  public async execute() {
    const reset = this.options.reset;
    const app = this.options.app;

    if (typeof reset === 'undefined') {
      if (typeof app === 'undefined') {
        throw new Error(`The application name is not defined.\nSupported apps: ${this.supportedApps.join(' ')}`);
      }

      if (!this.supportedApps.includes(app)) {
        throw new Error(`The application is not supported.\nSupported apps: ${this.supportedApps.join(' ')}`);
      }
    }

    const env = typeof reset !== 'undefined' ? this.defaultEnv : await this.getEnvValues();

    const envFilePath = this.environmentFilePath(app);

    await access(envFilePath, constants.W_OK).catch((error: NodeJS.ErrnoException) => {
      throw new Error(`Unable to write the environment configuration file:\n${error.message}`);
    });

    await this.writeEnvironmentFile(envFilePath, env);
  }

  /**
   * Returns environment configuration file contents.
   */
  protected envConfigFileContents(options: T) {
    const envConfig = `/**
 * The application environment configuration factory.
 * @returns application environment configuration
 */
export const appEnvFactory = () => ({
  meta: {
    version: '${(<Record<string, unknown>>options).version}',
  },
});
`;
    return envConfig;
  }

  /**
   * Writes environment file.
   */
  protected async writeEnvironmentFile(envFilePath: string, env: T) {
    return stat(envFilePath)
      .then(() => {
        const envFileContents = this.envConfigFileContents(env);
        return writeFile(envFilePath, envFileContents);
      })
      .catch((error: NodeJS.ErrnoException) => {
        throw error;
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
  protected async getPackageVersion(source = `${this.context.cwd}/package.json`) {
    return readFile(source, 'utf8')
      .then<string>(data => {
        const packageJsonContent: {
          version: string;
          [key: string]: unknown;
        } = JSON.parse(data);
        return packageJsonContent.version;
      })
      .catch((error: NodeJS.ErrnoException) => {
        throw error;
      });
  }

  /**
   * Gets environment variable value.
   * @param key environment variable key
   * @returns environment variable value or key if value is null or undefined
   */
  protected getEnvValue(key: string) {
    return process.env[key] ?? key;
  }

  /**
   * Forms the environment variable values object.
   */
  protected async getEnvValues(): Promise<T> {
    const version = await this.getPackageVersion();

    const env = <T>(<unknown>{
      version,
    });
    return env;
  }
}
