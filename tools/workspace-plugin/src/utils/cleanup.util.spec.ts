import { writeFile } from 'fs/promises';
import { fileExists } from 'nx/src/utils/fileutils';

import { cleanup } from './cleanup.util';

describe('cleanup', () => {
  const root = `${process.cwd()}`;
  const rootEslintJson = `${root}/.eslintrc.json`;

  beforeEach(async () => {
    await writeFile(rootEslintJson, '{}');
    const eslintJsonExists = fileExists(rootEslintJson);
    expect(eslintJsonExists).toBeTruthy();
  });

  afterAll(() => {
    const eslintJsonExists = fileExists(rootEslintJson);
    expect(eslintJsonExists).toBeFalsy();
  });

  it('should remove .eslintrc.json if it exists', async () => {
    await cleanup();
    const eslintJsonExists = fileExists(rootEslintJson);
    expect(eslintJsonExists).toBeFalsy();
  });
});
