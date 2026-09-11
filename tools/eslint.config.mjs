import { fileURLToPath } from 'url';

import { join, dirname } from 'path/posix';

import { defineConfig } from 'eslint/config';

import { exceptions, ignores, mtsConfig, tsConfig } from '../eslint.config.mjs';
import { namingConventionConfig } from '../.eslintrc.naming-convention.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig([
  {
    ignores: ignores.concat(join('!', __dirname, '/executors', '/**')).concat(join(__dirname, '/workspace-plugin', '/**')),
  },
  mtsConfig,
  tsConfig,
  exceptions.logger,
  exceptions.spec,
  {
    files: ['**/types/*.d.ts'],
    rules: {
      ...namingConventionConfig({ noInterfacePrefix: true }),
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
    },
  },
  {
    files: ['**/module-boundaries.generator.ts'],
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
