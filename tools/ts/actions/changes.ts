import { setOutput } from '@actions/core';
import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';

import { logger } from '../utils/logger';

const changesConfig = `${__dirname}/changes.json`;

const changesFileContent = <NodeJS.ErrnoException | string>readFileSync(changesConfig, 'utf8');
if (typeof changesFileContent !== 'string') {
  logger.printError(changesFileContent);

  process.exit(1);
}

const patternsObj = <Record<string, string[]>>JSON.parse(changesFileContent.trim());

const patternKeys = Object.keys(patternsObj);

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

for (let i = 0, max = patternKeys.length; i < max; i += 1) {
  const patternKey = patternKeys[i];
  const patterns = patternsObj[patternKey];
  const change = patternChanges(patterns);
  changes[patternKey] = change;
}

logger.printInfo(changes, 'changes');

setOutput('changes', changes);
