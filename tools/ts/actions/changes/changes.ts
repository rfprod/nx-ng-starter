import { setFailed, setOutput, summary } from '@actions/core';
import { spawnSync } from 'child_process';

import { logger } from '../../utils/logger';
import { changesConfig } from './changes.config';

const patternKeys = Object.keys(changesConfig) as Array<keyof typeof changesConfig>;

const env = {
  premerge: Boolean(process.env.PREMERGE),
  trunk: process.env.TRUNK ?? 'main',
};

/**
 * Get pattern changes.
 * @param patterns glob patterns
 */
const patternChanges = (patterns: string[]) => {
  let output = 'false';
  for (let i = 0, max = patterns.length; i < max; i += 1) {
    const pattern = patterns[i];

    const compareWith = env.premerge ? `origin/${env.trunk}` : 'HEAD~1';
    const command = `git diff --name-only HEAD ${compareWith} | grep "${pattern}"`;

    const { error, stdout } = spawnSync(command, {
      encoding: 'utf-8',
      stdio: 'pipe',
      shell: true,
    });
    if (typeof error !== 'undefined') {
      logger.printError(error);
      process.exit(1);
    }
    if (stdout.length > 0) {
      output = 'true';
    }
  }
  return output;
};

const changes = patternKeys.reduce((accumulator: Record<string, string>, item) => {
  accumulator[item] = 'false';
  return accumulator;
}, {});

const changesSummary: Array<[{ data: string }, { data: string }]> = [];

for (let i = 0, max = patternKeys.length; i < max; i += 1) {
  const patternKey = patternKeys[i];
  const patterns = changesConfig[patternKey];
  const change = patternChanges(patterns);
  changes[patternKey] = change;
  const changeSummary: (typeof changesSummary)['0'] = [{ data: patternKey }, { data: change === 'true' ? `${change} ✅` : `${change} ❌` }];
  changesSummary.unshift(changeSummary);
}

logger.printInfo(changes, 'changes');

(async () => {
  const headingLevel = 3;
  summary.addHeading('📋 Changes', headingLevel);
  summary.addTable([
    [
      { data: 'Scope', header: true },
      { data: 'Change', header: true },
    ],
    ...changesSummary,
  ]);
  summary.addBreak();
  await summary.write();

  setOutput('changes', changes);
})().catch(error => {
  logger.printError(error, 'Error writing action output');
  setFailed('Something went wrong. Failed writing GitHub action summary.');
});
