import { setOutput } from '@actions/core';
import { readFileSync } from 'fs';

import { logger } from '../../utils/logger';

const codeownersConfig = `${process.cwd()}/.github/CODEOWNERS`;

const codeownersFileContent = <NodeJS.ErrnoException | string>readFileSync(codeownersConfig, 'utf8');
if (typeof codeownersFileContent !== 'string') {
  logger.printError(codeownersFileContent);

  process.exit(1);
}

const getCodeowners = (config: string) => {
  const owners = config.match(/@[a-z0-9-]+/g);
  return (owners ?? []).map(item => item.replace(/^@/, ''));
};

const codeowners = getCodeowners(codeownersFileContent);

setOutput('matrix', codeowners);
