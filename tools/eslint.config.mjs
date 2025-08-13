import { fileURLToPath } from 'url';

import { join, dirname } from 'path/posix';

import { defineConfig } from 'eslint/config';

import { exceptions, ignores, mtsConfig, tsConfig } from '../eslint.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig([
  {
    ignores: ignores.concat(join('!', __dirname), '/**').concat(join(__dirname), '/workspace-plugin'),
  },
  mtsConfig,
  tsConfig,
  exceptions.logger,
  exceptions.spec,
]);
