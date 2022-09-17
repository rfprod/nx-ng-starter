import { spawnSync, SpawnSyncOptionsWithStringEncoding, SpawnSyncReturns } from 'child_process';
import * as fs from 'fs';
import { env } from 'process';
import readlineSync from 'readline-sync';
import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { argv } from 'yargs';

import { COLORS } from '../utils/colors';
import { logger } from '../utils/logger';

/**
 * Project root directory.
 */
const root = process.cwd();

type TUpdatablePackages = Record<string, string>;

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

/**
 * Prints script usage instructions.
 */
function printUsageInstructions() {
  // eslint-disable-next-line no-console -- needed here to print output in the terminal
  console.log(
    `\n${COLORS.CYAN}%s${COLORS.DEFAULT} ${COLORS.YELLOW}%s${COLORS.DEFAULT}
${COLORS.CYAN}%s${COLORS.DEFAULT} ${COLORS.YELLOW}%s${COLORS.DEFAULT}
${COLORS.CYAN}%s${COLORS.DEFAULT} ${COLORS.YELLOW}%s${COLORS.DEFAULT}
${COLORS.CYAN}%s${COLORS.DEFAULT} ${COLORS.YELLOW}%s${COLORS.DEFAULT}\n`,
    'Use --check flag to check for updates, e.g.',
    'npx ts-node -P ./tools/tsconfig.tools.json ./tools/ts/update.ts --check',
    'Use --check --jsonUpgraded flags to check for updates and save updated packages as json in the project root, e.g.',
    'npx ts-node -P ./tools/tsconfig.tools.json ./tools/ts/update.ts --check --jsonUpgraded',
    'Use --migrate=update flag to start migration process, e.g.',
    'npx ts-node -P ./tools/tsconfig.tools.json ./tools/ts/update.ts --migrate=update',
    'Use --migrate=only flag to execute existing migrations only, e.g.',
    'npx ts-node -P ./tools/tsconfig.tools.json ./tools/ts/update.ts --migrate=only',
  );
}

/**
 * Runs a process synchronously, and outputs result.
 * @param command command to run
 * @param [args] command arguments
 * @param [options] spawnSync options
 */
function spawnCommandSync(
  command: string,
  args: string[] = [],
  options: SpawnSyncOptionsWithStringEncoding = {
    env: { ...env, FORCE_COLOR: 'true' },
    encoding: 'utf8',
    shell: true,
  },
): SpawnSyncReturns<string> {
  const spawnSyncOutput = spawnSync(command, args, options);

  if (spawnSyncOutput.error) {
    // eslint-disable-next-line no-console -- needed here to print output in the terminal
    console.log(
      `${COLORS.CYAN}%s${COLORS.DEFAULT}
${COLORS.RED}%s:${COLORS.DEFAULT}\n%s
${COLORS.CYAN}%s:${COLORS.DEFAULT}\n%s
${COLORS.CYAN}%s:${COLORS.DEFAULT}\n%s\n`,
      'Process finished.',
      'ERROR',
      spawnSyncOutput.error,
      'stderr',
      spawnSyncOutput.stderr,
      'exit code',
      spawnSyncOutput.status,
    );
  } else {
    // eslint-disable-next-line no-console -- needed here to print output in the terminal
    console.log(
      `${COLORS.CYAN}%s${COLORS.DEFAULT}
${COLORS.CYAN}%s:${COLORS.DEFAULT}\n%s
${COLORS.CYAN}%s:${COLORS.DEFAULT}\n%s\n`,
      'Process finished.',
      'stdout',
      spawnSyncOutput.stdout,
      'exit code',
      spawnSyncOutput.status,
    );
  }

  return spawnSyncOutput;
}

function writeUpdateSummary(packages: TUpdatablePackages) {
  const path = `${root}/migrations-packages.json`;
  fs.writeFile(path, JSON.stringify(packages), (error: NodeJS.ErrnoException | null) => {
    if (error !== null) {
      logger.printError(error);
      process.exit(1);
    }
    // eslint-disable-next-line no-console -- needed here to print output in the terminal
    console.log(`\n${COLORS.GREEN}%s${COLORS.DEFAULT}%s\n`, 'Update summary saved: ', path);
  });
}

/**
 * Check for available updates.
 * @param [jsonUpgraded] defaults to true; passes flag to ncu cli, as a result output is in json format;
 */
function checkForUpdates(jsonUpgraded = false): TUpdatablePackages {
  const args = jsonUpgraded ? ['--jsonUpgraded'] : [];
  // eslint-disable-next-line no-console -- needed here to print output in the terminal
  console.log(`\n${COLORS.YELLOW}%s${COLORS.DEFAULT}\n`, 'Checking for updates. Wait for it...');
  const ncuOutput = spawnCommandSync('ncu', args);
  const updatablePackages: TUpdatablePackages =
    jsonUpgraded && typeof ncuOutput.error === 'undefined'
      ? JSON.parse(ncuOutput.stdout.replace(/Using yarn(.*package\.json)?/gi, '').trim()) ?? {}
      : {};
  if (jsonUpgraded) {
    writeUpdateSummary(updatablePackages);
  } else {
    // eslint-disable-next-line no-console -- needed here to print output in the terminal
    console.log(
      `\n${COLORS.YELLOW}%s${COLORS.DEFAULT}\n`,
      'Verify output above. Dependencies highlighted with red may have breaking changes but not necessarily.',
    );
  }
  return updatablePackages;
}

/**
 * Reads migrations.json, and executes migrations if file exists.
 */
function executeMigrations(): Observable<SpawnSyncReturns<string> | null> {
  const result = new Observable(function (this, subscriber: Subscriber<SpawnSyncReturns<string> | null>) {
    fs.readFile(`${root}/migrations.json`, 'utf8', (error, data) => {
      if (error !== null) {
        // eslint-disable-next-line no-console -- needed here to print output in the terminal
        console.log(`\n${COLORS.GREEN}%s${COLORS.DEFAULT}\n`, '<< NO MIGRATIONS >>');
        subscriber.next(null);
      } else {
        // eslint-disable-next-line no-console -- needed here to print output in the terminal
        console.log(`\n${COLORS.YELLOW}%s${COLORS.DEFAULT}\n`, '<< EXECUTING MIGRATIONS >>', data);

        const migrationProcessOutput = spawnCommandSync('npx nx migrate', ['--run-migrations']);
        if (migrationProcessOutput.error) {
          subscriber.error(migrationProcessOutput);
          process.exit(1);
        } else {
          const deleteMigrationsFile = spawnCommandSync(`rm ${root}/migrations.json`);
          if (deleteMigrationsFile.error) {
            subscriber.next(deleteMigrationsFile);
            process.exit(1);
          } else {
            subscriber.next(migrationProcessOutput);
          }
          subscriber.next(migrationProcessOutput);
        }
      }

      subscriber.complete();
      subscriber.unsubscribe();
    });
  });
  return result;
}

const newQuestionConfig: {
  limit: readlineSync.OptionType[];
  trueValue: readlineSync.OptionType[];
  falseValue: readlineSync.OptionType[];
} = {
  limit: ['yes', 'no', 'y', 'n', 'Y', 'N'],
  trueValue: ['yes', 'y', 'Y'],
  falseValue: ['no', 'n', 'N'],
};

const newQuestion = (
  question: string,
  config: typeof newQuestionConfig = {
    ...newQuestionConfig,
  },
) => {
  readlineSync.setDefaultOptions({ limit: config.limit });
  const answer = Boolean(
    readlineSync.question(`${question} (y/N)? `, {
      trueValue: config.trueValue,
      falseValue: config.falseValue,
    }),
  );
  return answer;
};

/**
 * Executes packages migration procedure recursively.
 * @param config migration configuration
 */
function migratePackagesRecursively(config: { packageNames: string[]; packageIndex: number }, bulkUserChoice?: boolean) {
  const processNextPackage = () => {
    const timeout = 150;
    void timer(timeout)
      .pipe(
        tap(() => {
          if (config.packageIndex < config.packageNames.length) {
            migratePackagesRecursively(
              {
                packageNames: config.packageNames,
                packageIndex: config.packageIndex + 1,
              },
              bulkUserChoice,
            );
          }
        }),
      )
      .subscribe();
  };
  const packageName = config.packageNames[config.packageIndex];
  if (typeof packageName !== 'undefined') {
    const answer =
      typeof bulkUserChoice === 'undefined'
        ? newQuestion(`> Migrate ${packageName} to the latest version`, {
            ...newQuestionConfig,
          })
        : bulkUserChoice;

    if (answer) {
      const command = `npx nx migrate ${packageName}`;
      const migratePackageOutput = spawnCommandSync(command);
      if (migratePackageOutput.error) {
        process.exit(1);
      }
      void executeMigrations()
        .pipe(
          finalize(() => {
            processNextPackage();
          }),
        )
        .subscribe();
    } else {
      processNextPackage();
    }
  }
}

/**
 * Starts migration for all packages defined in the migrations-packages.json.
 */
function updateAndMigratePackages(bulkUserChoice?: boolean) {
  const path = `${root}/migrations-packages.json`;
  fs.readFile(path, (error: NodeJS.ErrnoException | null, data?: Buffer) => {
    if (error !== null) {
      logger.printError(error);
      process.exit(1);
    }

    if (typeof data !== 'undefined') {
      const updatablePackages: TUpdatablePackages = JSON.parse(data.toString());

      // eslint-disable-next-line no-console -- needed here to print output in the terminal
      console.log(
        `\n${COLORS.CYAN}%s${COLORS.DEFAULT}\n%s\n`,
        `Updatable packages (local cache, rerun --check --jsonUpgraded to regenerate if output differs from the subsequent live check)`,
        updatablePackages,
      );

      const packageNames = Object.keys(updatablePackages);

      migratePackagesRecursively({ packageNames, packageIndex: 0 }, bulkUserChoice);
    }
  });
}

/**
 * Executes packages migration procedure recursively.
 * @param config migration configuration
 */
function executeMigrationsRecursively(config: { packageNames: string[]; packageVersions: string[]; packageIndex: number }) {
  const processNextPackage = () => {
    const timeout = 150;
    void timer(timeout)
      .pipe(
        tap(() => {
          if (config.packageIndex < config.packageNames.length) {
            executeMigrationsRecursively({
              packageNames: config.packageNames,
              packageVersions: config.packageVersions,
              packageIndex: config.packageIndex + 1,
            });
          }
        }),
      )
      .subscribe();
  };
  const packageName = config.packageNames[config.packageIndex];
  const packageVersion = config.packageVersions[config.packageIndex];
  const parsedVersion = typeof packageVersion !== 'undefined' ? packageVersion.match(/^\d+/) : null;
  const previousVersion = parsedVersion === null ? parsedVersion : Number(parsedVersion[0]) > 0 ? Number(parsedVersion[0]) - 1 : 0;
  if (typeof packageName !== 'undefined' && previousVersion !== null) {
    const answer = newQuestion(`> Execute migration of ${packageName} from the version ${previousVersion} to the latest version`, {
      ...newQuestionConfig,
    });

    if (answer) {
      const command = `npx nx migrate ${packageName} --migrate-only --from="${packageName}@${previousVersion}"`;
      const migratePackageOutput = spawnCommandSync(command);
      if (migratePackageOutput.error) {
        process.exit(1);
      }
      void executeMigrations()
        .pipe(
          finalize(() => {
            processNextPackage();
          }),
        )
        .subscribe();
    } else {
      processNextPackage();
    }
  }
}

/**
 * Migrates packages (without updating any) from the previous version.
 */
function migratePackagesOnly() {
  const path = `${root}/package.json`;
  fs.readFile(path, (error: NodeJS.ErrnoException | null, data?: Buffer) => {
    if (error !== null) {
      logger.printError(error);
      process.exit(1);
    }

    if (typeof data !== 'undefined') {
      const parsedPackageJson: IPackageJson = JSON.parse(data.toString());
      const dependencies = parsedPackageJson.dependencies;

      // eslint-disable-next-line no-console -- needed here to print output in the terminal
      console.log(`\n${COLORS.CYAN}%s${COLORS.DEFAULT}\n%s\n`, `Parsed dependencies`, dependencies);

      const packageNames = Object.keys(dependencies);
      const packageVersions = Object.values(dependencies);

      executeMigrationsRecursively({ packageNames, packageVersions, packageIndex: 0 });
    }
  });
}

const removeUnneededFiles = () => {
  const migrations = `${root}/migrations.json`;
  const migrationsPackages = `${root}/migrations-packages.json`;
  fs.unlink(migrations, error => {
    if (error !== null) {
      logger.printError(error, 'Non breaking error');
    }
  });
  fs.unlink(migrationsPackages, error => {
    if (error !== null) {
      logger.printError(error, 'Non breaking error');
    }
  });
};

/**
 * Reads input, and follows control flow.
 */
function readInputAndRun(): void {
  const check = (<{ [key: string]: boolean | undefined }>argv).check;
  const cleanup = (<{ [key: string]: boolean | undefined }>argv).cleanup;
  const migrate = (<{ [key: string]: string | undefined }>argv).migrate;
  const bulkUserChoice = (<{ [key: string]: boolean | undefined }>argv).bulkUserChoice;
  if (cleanup === true) {
    removeUnneededFiles();
  } else if (check === true) {
    const jsonUpgraded = (<{ [key: string]: boolean | undefined }>argv).jsonUpgraded;
    checkForUpdates(jsonUpgraded);
  } else if (migrate === 'update') {
    updateAndMigratePackages(bulkUserChoice);
  } else if (migrate === 'only') {
    migratePackagesOnly();
  } else {
    printUsageInstructions();
  }
}

readInputAndRun();
