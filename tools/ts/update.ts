import { Observable, Subscriber, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fs from 'fs';
import { argv } from 'yargs';
import { spawnSync, SpawnSyncOptionsWithStringEncoding, SpawnSyncReturns } from 'child_process';
import readlineSync from 'readline-sync';

import { COLORS } from './colors';

/**
 * @name cwd
 * @constant
 * @summary Current working directory.
 */
const cwd = __dirname;

/**
 * @name root
 * @constant
 * @summary Project root directory.
 */
const root = `${cwd}/../..`;

type TUpdatablePackages = Record<string, string>;

/**
 * Prints script usage instructions.
 */
function printUsageInstructions() {
  console.log(
    `\n${COLORS.CYAN}%s${COLORS.DEFAULT} ${COLORS.YELLOW}%s${COLORS.DEFAULT}
${COLORS.CYAN}%s${COLORS.DEFAULT} ${COLORS.YELLOW}%s${COLORS.DEFAULT}
${COLORS.CYAN}%s${COLORS.DEFAULT} ${COLORS.YELLOW}%s${COLORS.DEFAULT}
${COLORS.CYAN}%s${COLORS.DEFAULT} ${COLORS.YELLOW}%s${COLORS.DEFAULT}\n`,
    'Use --check flag to check for updates, e.g.',
    'yarn workspace:update:check',
    'Use --check --jsonUpgraded flags to check for updates and save updated packages as json in the project root, e.g.',
    'yarn workspace:update:start',
    'Use --migrate=start flag to start migration process, e.g.',
    'yarn workspace:update:process',
    'Use --migrate=execute flag to execute migrations, e.g.',
    'yarn workspace:update:execute',
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
    env: { FORCE_COLOR: 'true' },
    encoding: 'utf8',
    shell: true,
  },
): SpawnSyncReturns<string> {
  const spawnSyncOutput = spawnSync(command, args, options);

  if (spawnSyncOutput.error) {
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

/**
 * Reads migrations.json, and executes migrations if file exists.
 */
function executeMigrations(): Observable<SpawnSyncReturns<string> | null> {
  const result = new Observable(function (
    this,
    subscriber: Subscriber<SpawnSyncReturns<string> | null>,
  ) {
    fs.readFile(`${root}/migrations.json`, 'utf8', (error, data) => {
      if (error !== null) {
        console.log(`\n${COLORS.GREEN}%s${COLORS.DEFAULT}\n`, '<< NO MIGRATIONS >>');
        subscriber.next(null);
      } else {
        console.log(`\n${COLORS.YELLOW}%s${COLORS.DEFAULT}\n`, '<< EXECUTING MIGRATIONS >>');
        console.log(data);

        const migrationProcessOutput = spawnCommandSync(
          `yarn nx migrate --run-migrations=${root}/migrations.json`,
        );
        subscriber.next(migrationProcessOutput);
      }

      subscriber.complete();
      subscriber.unsubscribe();
    });
  });
  return result;
}

function writeUpdateSummary(packages: TUpdatablePackages) {
  const path = `${root}/migrations-packages.json`;
  fs.writeFile(path, JSON.stringify(packages), (error: NodeJS.ErrnoException | null) => {
    if (error !== null) {
      console.log(`\n${COLORS.RED}%s${COLORS.DEFAULT}\n%s\n`, 'ERROR', error);
      process.exit(1);
    }
    console.log(`\n${COLORS.GREEN}%s${COLORS.DEFAULT}%s\n`, 'Update summary saved: ', path);
  });
}

/**
 * Check for available updates.
 * @param [jsonUpgraded] defaults to true; passes flag to ncu cli, as a result output is in json format;
 */
function checkForUpdates(jsonUpgraded = false): TUpdatablePackages {
  const args = jsonUpgraded ? ['--jsonUpgraded'] : [];
  console.log(`\n${COLORS.YELLOW}%s${COLORS.DEFAULT}\n`, 'Checking for updates. Wait for it...');
  const ncuOutput = spawnCommandSync('ncu', args);
  const updatablePackages: TUpdatablePackages = jsonUpgraded
    ? JSON.parse(ncuOutput.stdout) ?? {}
    : {};
  if (jsonUpgraded) {
    writeUpdateSummary(updatablePackages);
  } else {
    console.log(
      `\n${COLORS.YELLOW}%s${COLORS.DEFAULT}\n`,
      'Verify output above. Dependencies highlighted with red may have breaking changes but not necessarily.',
    );
  }
  return updatablePackages;
}

/**
 * Executes packages migration procedure recursively.
 * @param config migration configuration
 */
function migratePackagesRecursively(config: { packageNames: string[]; packageNameIndex: number }) {
  const packageName = config.packageNames[config.packageNameIndex];
  if (typeof packageName !== 'undefined') {
    readlineSync.setDefaultOptions({
      limit: ['yes', 'no', 'y', 'n', 'Y', 'N'],
    });
    const question = `> Migrate ${packageName} to the latest version`;
    /**
     * @note explicit boolean cast
     * The question returns boolean, respective types library is outdated (it's always string).
     */
    const answer = Boolean(
      readlineSync.question(`${question} (y/N)? `, {
        trueValue: ['yes', 'y', 'Y'],
        falseValue: ['no', 'n', 'N'],
      }),
    );

    if (answer) {
      const migratePackageOutput = spawnCommandSync(`yarn nx migrate ${packageName}`);
      if (migratePackageOutput.error) {
        process.exit(1);
      }
    }

    const timeout = 150;
    void timer(timeout)
      .pipe(
        tap(() => {
          if (config.packageNameIndex < config.packageNames.length) {
            migratePackagesRecursively({
              packageNames: config.packageNames,
              packageNameIndex: config.packageNameIndex + 1,
            });
          }
        }),
      )
      .subscribe();
  }
}

/**
 * Starts migration for all packages defined in the migrations-packages.json that should have been creaed previously.
 */
function migratePackages() {
  const path = `${root}/migrations-packages.json`;
  fs.readFile(path, (error: NodeJS.ErrnoException | null, data?: Buffer) => {
    if (error !== null) {
      console.log(`\n${COLORS.RED}%s${COLORS.DEFAULT}\n%s\n`, 'ERROR', error);
      process.exit(1);
    }

    if (typeof data !== 'undefined') {
      const updatablePackages: TUpdatablePackages = JSON.parse(data.toString());

      console.log(
        `\n${COLORS.CYAN}%s${COLORS.DEFAULT}\n%s\n`,
        `Updatable packages (local cache, rerun --check --jsonUpgraded to regenerate if output differs from the subsequent live check)`,
        updatablePackages,
      );

      /**
       * Do live update check to veryfy that json is not outdated.
       */
      checkForUpdates(false);

      const packageNames = Object.keys(updatablePackages);

      migratePackagesRecursively({ packageNames, packageNameIndex: 0 });
    }
  });
}

/**
 * Reads input, and follows control flow.
 */
function readInputAndRun(): void {
  const check = argv.check;
  const migrate = argv.migrate;
  if (Boolean(check)) {
    const jsonUpgraded = Boolean(argv.jsonUpgraded);
    checkForUpdates(jsonUpgraded);
  } else if (migrate === 'start') {
    migratePackages();
  } else if (migrate === 'execute') {
    void executeMigrations().subscribe();
  } else {
    printUsageInstructions();
  }
}

readInputAndRun();
