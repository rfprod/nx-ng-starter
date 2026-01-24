import { fileURLToPath } from 'url';

import { join, dirname } from 'path/posix';

import { defineConfig } from 'eslint/config';

import { exceptions, ignores, mtsConfig, tsConfig } from '../../eslint.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig([
  {
    ignores: ignores.concat(join('!', __dirname), '/**'),
  },
  mtsConfig,
  tsConfig,
  exceptions.logger,
  exceptions.spec,
  {
    files: ['**/module-boundaries.generator.ts', '**/tsconfig-migrations.generator.ts'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'max-depth': ['error', 6],
      'max-lines-per-function': [
        'error',
        {
          max: 59,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
    },
  },
]);
