import { setFailed, setOutput, summary } from '@actions/core';
import { spawnSync } from 'child_process';

import { logger } from '../../utils/logger';

const env = {
  affected: process.env['AFFECTED'] ?? '',
  batchSize: process.env['BATCH_SIZE'] ?? '5',
  withTarget: process.env['WITH_TARGET'] ?? '',
};

/**
 * Get projects and split then into batches.
 */
const splitProjects = () => {
  const defaultBatchSize = 5;
  let batchSize = parseInt(env.batchSize, 10);
  if (isNaN(batchSize)) {
    logger.printInfo(batchSize, 'Unable to parse batchSize value. Will use default.');
    batchSize = defaultBatchSize;
  }

  const affected = env.affected === 'true' ? ' --affected' : '';
  const withTarget = env.withTarget !== '' ? ` --withTarget ${env.withTarget}` : '';

  const projects: string[] = [];

  const command = ['npx  nx show projects', affected, withTarget].join('');
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
    logger.printInfo(stdout, 'stdout');
    const stringifiedArray = `["${stdout.replace(/\n/g, ' ').trim().replace(/\s/g, '","')}"]`;
    logger.printInfo(stringifiedArray, 'stringified array');
    const parsed: string[] = JSON.parse(stringifiedArray);
    let chunk = [];
    while (parsed.length > 0) {
      chunk = parsed.splice(0, batchSize);
      projects.push(chunk.join(','));
    }
  }

  return projects;
};

const projects = splitProjects();

/** Summary about collected projects. */
const chunkSummary: Array<[{ data: string }, { data: string }]> = [];

for (let i = 0, max = projects.length; i < max; i += 1) {
  const chunk = projects[i];
  const changeSummary: (typeof chunkSummary)['0'] = [{ data: `${i}` }, { data: JSON.stringify(chunk) }];
  chunkSummary.unshift(changeSummary);
}

logger.printInfo(JSON.stringify(projects), 'projects');

(async () => {
  const scope = env.withTarget === '' ? '' : `with a target [${env.withTarget}]`;
  const affected = env.affected === 'true' ? 'Affected' : '';
  const headingLevel = 3;
  summary.addHeading(`📋 ${affected} Projects ${scope}`, headingLevel);
  summary.addTable([
    [
      { data: 'Scope', header: true },
      { data: 'Change', header: true },
    ],
    ...chunkSummary,
  ]);
  summary.addBreak();
  await summary.write();

  setOutput('projects', projects);
})().catch(error => {
  logger.printError(error, 'Error writing action output');
  setFailed('Something went wrong. Failed writing GitHub action summary.');
});
