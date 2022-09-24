import { getMultilineInput, setOutput } from '@actions/core';
import { execSync } from 'child_process';

import { logger } from '../utils/logger';

const patterns = getMultilineInput('patterns');
logger.printInfo(patterns, 'patterns');

/**
 * Get pattern changes.
 * @param pattern glob pattern
 */
const patternChanges = (pattern: string) => {
  let stdout = '';
  try {
    const buffer = execSync(`git diff --name-only HEAD HEAD~1 | grep ${pattern}`);
    stdout = buffer.toString();
    logger.printInfo(stdout);
  } catch (error) {
    logger.printError(<Error>error);
    process.exit(1);
  }
  return Boolean(stdout);
};

const changes = {};

(async () => {
  for (let i = 0, max = patterns.length; i < max; i += 1) {
    const pattern = patterns[i];
    const change = patternChanges(pattern);
    changes[i] = change;
  }
})().catch(error => {
  logger.printError(error);
  process.exit(1);
});

setOutput('changes', changes);
