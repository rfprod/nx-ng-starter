import { setFailed, summary } from '@actions/core';
import { spawnSync } from 'child_process';
import { env } from 'process';

import { logger } from '../../utils/logger';
import { actors, defaultThresholds } from './contribution-size.config';
import type { IThresholdsConfig } from './contribution-size.interface';

const ENV = {
  maxFiles: process.env.MAX_FILES ?? '0',
  insertions: process.env.INSERTIONS ?? '0',
  deletions: process.env.DELETIONS ?? '0',
  trunk: process.env.TRUNK ?? 'main',
  actor: process.env.ACTOR,
};

const actor = actors.find(item => item.actor === ENV.actor);

const thresholds: IThresholdsConfig =
  typeof actor !== 'undefined'
    ? actor.thresholds
    : {
        maxFiles: parseInt(ENV.maxFiles, 10),
        insertions: parseInt(ENV.insertions, 10),
        deletions: parseInt(ENV.deletions, 10),
      };

thresholds.maxFiles = isNaN(thresholds.maxFiles) ? defaultThresholds.maxFiles : thresholds.maxFiles;
thresholds.insertions = isNaN(thresholds.insertions) ? defaultThresholds.insertions : thresholds.insertions;
thresholds.deletions = isNaN(thresholds.deletions) ? defaultThresholds.deletions : thresholds.deletions;

const compareWith = `origin/${ENV.trunk}`;

const spawnSyncOptions = Object.freeze({
  env: { ...env, FORCE_COLOR: 'true' },
  stdio: 'pipe',
  encoding: 'utf-8',
  cwd: process.cwd(),
  shell: true,
});

/**
 * Changed file count getter.
 * @returns changed files count
 */
const getChangedFiles = () => {
  let result = Number(Infinity);
  try {
    const command = `git diff HEAD ${compareWith} --shortstat | grep -o -E [0-9]+ | awk 'FNR == 1 {print $1}'`;
    const { stdout, stderr } = spawnSync(command, { ...spawnSyncOptions });
    if (stderr.length === 0) {
      result = stdout.length > 0 ? parseInt(stdout, 10) : 0;
    }
  } catch (e) {
    logger.printError(e as Error, 'Error getting changed files count');
  }
  return result;
};

/**
 * Insertions count getter.
 * @returns insertions count
 */
const getInsertions = () => {
  let result = Number(Infinity);
  try {
    const command = `git diff HEAD ${compareWith} --shortstat | grep -o -E [0-9]+ | awk 'FNR == 3 {print $1}'`;
    const { stdout, stderr } = spawnSync(command, { ...spawnSyncOptions });
    if (stderr.length === 0) {
      result = stdout.length > 0 ? parseInt(stdout, 10) : 0;
    }
  } catch (e) {
    logger.printError(e as Error, 'Error getting insertions count');
  }
  return result;
};

/**
 * Deletions count getter.
 * @returns deletions count
 */
const getDeletions = () => {
  let result = Number(Infinity);
  try {
    const command = `git diff HEAD ${compareWith} --shortstat | grep -o -E [0-9]+ | awk 'FNR == 2 {print $1}'`;
    const { stdout, stderr } = spawnSync(command, { ...spawnSyncOptions });
    if (stderr.length === 0) {
      result = stdout.length > 0 ? parseInt(stdout, 10) : 0;
    }
  } catch (e) {
    logger.printError(e as Error, 'Error getting deletions count');
  }
  return result;
};

const changedFiles = getChangedFiles();
const insertions = getInsertions();
const deletions = getDeletions();

logger.printInfo(changedFiles, 'Changed files');
logger.printInfo(insertions, 'Insertions');
logger.printInfo(deletions, 'Deletions');

(async () => {
  const headingLevel = 3;
  summary.addHeading('👤 Actor', headingLevel);
  summary.addLink(`${ENV.actor}`, `https://github.com/${ENV.actor}`);
  summary.addHeading('📈 Pull request metrics', headingLevel);
  summary.addTable([
    [
      { data: 'Metric', header: true },
      { data: 'Value', header: true },
      { data: 'Threshold', header: true },
      { data: 'Status', header: true },
    ],
    [
      { data: 'Changed files' },
      { data: `${changedFiles}` },
      { data: `${thresholds.maxFiles}` },
      { data: changedFiles <= thresholds.maxFiles ? `OK ✅` : `Error ❌` },
    ],
    [
      { data: 'Insertions' },
      { data: `${insertions}` },
      { data: `${thresholds.insertions}` },
      { data: insertions <= thresholds.insertions ? `OK ✅` : `Error ❌` },
    ],
    [
      { data: 'Deletions' },
      { data: `${deletions}` },
      { data: `${thresholds.deletions}` },
      { data: deletions <= thresholds.deletions ? `OK ✅` : `Error ❌` },
    ],
  ]);
  summary.addBreak();
  await summary.write();
  if (changedFiles > thresholds.maxFiles) {
    setFailed(
      `Exceeded file change threshold.\nMax file change threshold: ${thresholds.maxFiles}.\nActual files changed: ${changedFiles}.\nConsider breaking down the contribution into several pull requests.`,
    );
  }
  if (insertions > thresholds.insertions) {
    setFailed(
      `Exceeded insertion threshold.\nMax insertions threshold: ${thresholds.insertions}.\nActual insertions: ${insertions}.\nConsider breaking down the contribution into several pull requests.`,
    );
  }
  if (deletions > thresholds.deletions) {
    setFailed(
      `Exceeded deletion threshold.\nMax deletions threshold: ${thresholds.deletions}.\nActual deletions: ${deletions}.\nConsider breaking down the contribution into several pull requests.`,
    );
  }
})().catch(error => {
  logger.printError(error, 'Error writing action output');
  setFailed('Something went wrong. Failed writing GitHub action summary.');
});
