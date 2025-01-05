import { setFailed, setOutput, summary } from '@actions/core';
import { readFileSync } from 'fs';

import { logger } from '../../utils/logger';

const codeownersConfig = `${process.cwd()}/.github/CODEOWNERS`;

const codeownersFileContent = readFileSync(codeownersConfig, 'utf8') as NodeJS.ErrnoException | string;
if (typeof codeownersFileContent !== 'string') {
  logger.printError(codeownersFileContent);

  process.exit(1);
}

const getCodeowners = (config: string) => {
  const owners = config.match(/@[a-z0-9-]+/g);
  return (owners ?? []).map(item => item.replace(/^@/, ''));
};

const codeowners = getCodeowners(codeownersFileContent);

const codeownersSummary: Array<[{ data: string }, { data: string }]> = codeowners.reduce(
  (accumulator: Array<[{ data: string }, { data: string }]>, item) => {
    const changeSummary: [{ data: string }, { data: string }] = [{ data: item }, { data: `https://github.com/${item}` }];
    accumulator.unshift(changeSummary);
    return accumulator;
  },
  [],
);

logger.printInfo(codeowners, 'codeowners');

(async () => {
  const headingLevel = 3;
  summary.addHeading('📋 Changes', headingLevel);
  summary.addTable([
    [
      { data: 'Username', header: true },
      { data: 'Link', header: true },
    ],
    ...codeownersSummary,
  ]);
  summary.addBreak();
  await summary.write();

  setOutput('matrix', codeowners);
})().catch(error => {
  logger.printError(error, 'Error writing action output');
  setFailed('Something went wrong. Failed writing GitHub action summary.');
});
