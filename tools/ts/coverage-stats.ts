import * as fs from 'fs';

import { projects } from '../../jest.config';
import { COLORS } from './colors';

/**
 * Current working directory.
 */
const cwd = __dirname;

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
};

let readFiles = 0;

const writeAverageStats = () => {
  const readmePath = `${cwd}/UNIT_COVERAGE.md`;
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

  fs.writeFile(readmePath, coverageSummary, (error: NodeJS.ErrnoException | null) => {
    if (error !== null) {
      return console.log(error);
    }
  });
};

const parseSummary = (summary: ICoverageSummaryObj, summaryKeys: (keyof ICoverageSummaryObj)[]) => {
  for (const summaryKey of summaryKeys) {
    const total = summary[summaryKey];
    const totalKeys = Object.keys(total) as (keyof ICoverageSummary)[];
    for (const totalKey of totalKeys) {
      const value = total[totalKey];
      const currentValue = totalCoverage[summaryKey][totalKey];
      if (typeof value === 'number' && typeof currentValue === 'number') {
        const digits = 2;
        totalCoverage[summaryKey][totalKey] = Number(
          (currentValue + (totalKey === 'pct' ? value / projects.length : value)).toFixed(digits),
        );
      }
    }
  }

  console.log(`✅ ${COLORS.GREEN}%s %o${COLORS.DEFAULT}`, `Total coverage:\n`, totalCoverage);
};

const readFileCallback = (error: NodeJS.ErrnoException | null, data?: Buffer) => {
  if (error !== null) {
    console.log(`❗ ${COLORS.LIGHT_RED}%s${COLORS.DEFAULT}`, 'No coverage summary for the project');
  }

  if (typeof data !== 'undefined') {
    const json: ICoverageSummaryJson = JSON.parse(data.toString());

    console.log(`✅ ${COLORS.YELLOW}%s %o${COLORS.DEFAULT}`, `Total:\n`, json.total);

    const summary = json.total;
    const summaryKeys = Object.keys(summary) as (keyof ICoverageSummaryObj)[];

    parseSummary(summary, summaryKeys);
  }

  readFiles += 1;

  if (readFiles === projects.length) {
    writeAverageStats();
  }
};

for (const project of projects) {
  const path = project.replace(/<rootDir>/, '');

  fs.readFile(`${cwd}/../../coverage${path}/coverage-summary.json`, readFileCallback);
}
