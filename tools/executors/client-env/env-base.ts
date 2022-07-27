import { ExecutorContext, logger } from '@nrwl/devkit';
import dotenv from 'dotenv';
import { constants } from 'fs';
import { access, readFile, stat, writeFile } from 'fs/promises';

import { IExecutorOptions, TSupportedApp } from './schema';

export interface IEnvConfig {
  version: string;
}

export abstract class AppBaseEnvConfig<T = IEnvConfig> {
  /**
   * Executor context.
   */
  public options: IExecutorOptions = {
    app: 'client',
  };

  /**
   * Executor context.
   */
  public context: ExecutorContext = {
    cwd: process.cwd(),
    isVerbose: false,
    root: '/root',
    workspace: {
      version: 1,
      projects: {},
    },
    configurationName: '',
    projectName: '',
    target: { executor: '' },
    targetName: '',
  };

  /**
   * The supported application names.
   */
  public readonly supportedApps: TSupportedApp[] = [];

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
      if (!this.supportedApps.includes(app)) {
        throw new Error(`The application is not supported.\nSupported apps: ${this.supportedApps.join(' ')}`);
      }
    }

    const env = typeof reset !== 'undefined' ? this.defaultEnv : await this.getEnvValues();

    const envFilePath = this.environmentFilePath(app);

    const accessResult = await access(envFilePath, constants.W_OK)
      .then(() => null)
      .catch((error: NodeJS.ErrnoException) => error);

    if (accessResult === null) {
      await this.writeEnvironmentFile(envFilePath, env);
    } else {
      throw new Error(`Unable to write the environment configuration file:\n${accessResult.message}`);
    }
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
    const statResult = await stat(envFilePath)
      .then(() => this.envConfigFileContents(env))
      .catch((error: NodeJS.ErrnoException) => error);

    if (typeof statResult === 'string') {
      await writeFile(envFilePath, statResult)
        .then(() => {
          logger.info('Output generated at:');
          logger.info(envFilePath);
        })
        .catch((error: NodeJS.ErrnoException) => {
          throw new Error(`Unable to write environment file:\n${error.message}`);
        });
    } else {
      throw new Error(`Unable to stat environment file:\n${statResult.message}`);
    }
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
