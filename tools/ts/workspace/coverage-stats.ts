import { getJestProjects } from '@nrwl/jest';
import { ExecException, execFile } from 'child_process';
import * as fs from 'fs';
import path from 'path';

import { logger } from '../utils/logger';

/**
 * Project root directory.
 */
const root = process.cwd();

/**
 * Jest projects array.
 */
const jestProjects = <string[]>[...getJestProjects()];

interface ICoverageSummary {
  total: number;
  covered: number;
  skipped: number;
  pct: number | string;
}

interface ICoverageSummaryObj {
  lines: ICoverageSummary;
  statements: ICoverageSummary;
  functions: ICoverageSummary;
  branches: ICoverageSummary;
  branchesTrue: ICoverageSummary;
}

interface ICoverageSummaryJson {
  total: ICoverageSummaryObj;
  [key: string]: ICoverageSummaryObj;
}

const totalCoverage: ICoverageSummaryObj = {
  lines: { total: 0, covered: 0, skipped: 0, pct: 0 },
  statements: { total: 0, covered: 0, skipped: 0, pct: 0 },
  functions: { total: 0, covered: 0, skipped: 0, pct: 0 },
  branches: { total: 0, covered: 0, skipped: 0, pct: 0 },
  branchesTrue: { total: 0, covered: 0, skipped: 0, pct: 0 },
};

let readFiles = 0;

const writeAverageStats = () => {
  const coverageSummary = `# Unit Coverage Stats

## Lines

| Total                         | Covered                         | Skipped                         | PCT                         |
| ----------------------------- | ------------------------------- | ------------------------------- | --------------------------- |
| ${totalCoverage.lines.total}  | ${totalCoverage.lines.covered}  | ${totalCoverage.lines.skipped}  | ${totalCoverage.lines.pct}% |

## Statements

| Total                              | Covered                              | Skipped                              | PCT                              |
| ---------------------------------- | ------------------------------------ | ------------------------------------ | -------------------------------- |
| ${totalCoverage.statements.total}  | ${totalCoverage.statements.covered}  | ${totalCoverage.statements.skipped}  | ${totalCoverage.statements.pct}% |

## Functions

| Total                             | Covered                             | Skipped                             | PCT                             |
| --------------------------------- | ----------------------------------- | ----------------------------------- | ------------------------------- |
| ${totalCoverage.functions.total}  | ${totalCoverage.functions.covered}  | ${totalCoverage.functions.skipped}  | ${totalCoverage.functions.pct}% |

## Branches

| Total                            | Covered                            | Skipped                            | PCT                            |
| -------------------------------- | ---------------------------------- | ---------------------------------- | ------------------------------ |
| ${totalCoverage.branches.total}  | ${totalCoverage.branches.covered}  | ${totalCoverage.branches.skipped}  | ${totalCoverage.branches.pct}% |
`;

  const readmePath = path.join(root, 'UNIT_COVERAGE.md');

  fs.writeFile(readmePath, coverageSummary, (error: NodeJS.ErrnoException | null) => {
    if (error !== null) {
      logger.printError(error);
    }

    const command = 'yarn';
    const args = ['prettier', readmePath, '--write'];

    execFile(command, args, (err: ExecException | null) => {
      if (err !== null) {
        logger.printError(err);
      }
    });
  });
};

/**
 * Projects count which coverage is more than 0.
 */
const projectsCount: Record<keyof ICoverageSummaryObj, number> = {
  branches: 0,
  functions: 0,
  lines: 0,
  statements: 0,
  branchesTrue: 0,
};
const projectsCountKeys = Object.keys(projectsCount) as Array<keyof ICoverageSummaryObj>;

const parseSummary = (summary: ICoverageSummaryObj, summaryKeys: (keyof ICoverageSummaryObj)[]) => {
  const zeroCoverage: Record<keyof ICoverageSummaryObj, number> = {
    branches: 0,
    functions: 0,
    lines: 0,
    statements: 0,
    branchesTrue: 0,
  };

  for (const summaryKey of summaryKeys) {
    const summarySection = summary[summaryKey];
    const summarySectionKeys = Object.keys(summarySection) as (keyof ICoverageSummary)[];
    for (const summarySectionKey of summarySectionKeys) {
      const value = summarySection[summarySectionKey];
      const currentValue = totalCoverage[summaryKey][summarySectionKey];
      if (typeof value === 'number' && typeof currentValue === 'number') {
        if (summarySectionKey === 'pct' && value > 0) {
          zeroCoverage[summaryKey] = zeroCoverage[summaryKey] + 1;
        }
        const digits = 2;
        totalCoverage[summaryKey][summarySectionKey] = Number(
          (currentValue + (summarySectionKey === 'pct' ? value : value)).toFixed(digits),
        );
      }
    }
  }

  for (const projectCountKey of projectsCountKeys) {
    if (zeroCoverage[projectCountKey] > 0) {
      projectsCount[projectCountKey] = projectsCount[projectCountKey] + 1;
    }
  }
};

/**
 * Counts average PCT.
 */
const recalculateStats = () => {
  for (const projectsCountKey of projectsCountKeys) {
    const value = totalCoverage[projectsCountKey].pct as number;
    const digits = 2;
    totalCoverage[projectsCountKey].pct = Number((value / projectsCount[projectsCountKey]).toFixed(digits));
  }
};

const readFileCallback = (error: NodeJS.ErrnoException | null, data?: Buffer) => {
  if (error !== null) {
    logger.printError(new Error('No coverage summary for the project'));
  }

  if (typeof data !== 'undefined') {
    const json: ICoverageSummaryJson = JSON.parse(data.toString());

    logger.printSuccess(`Total:\n ${JSON.stringify(json.total)}`);

    const summary = json.total;
    const summaryKeys = Object.keys(summary) as (keyof ICoverageSummaryObj)[];

    parseSummary(summary, summaryKeys);
  }

  readFiles += 1;

  if (readFiles === jestProjects.length) {
    recalculateStats();
    writeAverageStats();
  }
};

for (const project of jestProjects) {
  const projectPath = project.replace(/<rootDir>/, '').replace('jest.config.ts', '');
  const filePath = path.join(root, 'coverage', projectPath, 'coverage-summary.json');

  fs.readFile(filePath, readFileCallback);
}
